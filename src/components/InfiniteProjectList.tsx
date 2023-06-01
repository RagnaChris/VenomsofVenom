import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiFillLike, AiOutlineLike, AiOutlineTwitter } from "react-icons/Ai";
import { api } from "~/utils/api";

type Project = {
  id: string;
  projectName: string;
  twitterUrl: string;
  logoUrl: string;
  supply: string;
  mintPrice: string;
  mintDate: Date;
  likeCount: number;
  likedByMe: boolean;
};

type InfiniteProjectListProp = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchMoreProjects: () => Promise<unknown>;
  projects?: Project[];
};

const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
});

export function InfiniteProjectList({
  projects,
  isError,
  isLoading,
  hasMore = false,
  fetchMoreProjects,
}: InfiniteProjectListProp) {
  if (isLoading) return <h1 className="my-8 flex justify-center">Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  if (projects == null || projects.length === 0) {
    return (
      <h2 className="my-8 flex justify-center text-2xl text-gray-500">No Projects</h2>
    );
  }

  return (
    <ul>
      <InfiniteScroll
        dataLength={projects.length}
        next={fetchMoreProjects}
        hasMore={hasMore}
        loader={"Loading..."}
      >
        {projects.map((project, index) => {
          const toggleLike = api.project.toggleLike.useMutation();

          function handleToggleLike() {
            toggleLike.mutate({ id: project.id })
          }

          return (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td>Image</td>
              <td className="text-left">{project.projectName}</td>
              <td>{project.supply}</td>
              <td>{project.mintPrice}</td>
              <td><AiOutlineTwitter /><span>Twitter Followers</span></td>
              <td>
                <LikeButton
                  onClick={handleToggleLike}
                  isLoading={toggleLike.isLoading}
                  likedByMe={project.likedByMe}
                  likeCount={project.likeCount}
                />
              </td>
            </tr>
          );
        })}
      </InfiniteScroll>
    </ul>
  );
}

type LikeButtonProps = {
  onClick: ()=> void
  isLoading: boolean
  likedByMe: boolean;
  likeCount: number;
};

function LikeButton({ onClick, isLoading, likedByMe, likeCount }: LikeButtonProps) {
  const session = useSession();
  const LikeIcon = likedByMe ? AiFillLike : AiOutlineLike;
  if (session.status !== "authenticated") {
    return (
      <div>
        <LikeIcon />
        <span>{likeCount}</span>
      </div>
    );
  }

  return (
    <button
    disabled={isLoading}
    onClick={onClick}
      className={`group flex items-center gap-1 self-start transition-colors duration-200 
  ${
    likedByMe
      ? "text-green-500"
      : "text-gray-500 hover:text-green-500 focus-visible:text-green-500"
  } `}
    >
      <LikeIcon
        className={`transition-colors duration-200 ${
          likedByMe
            ? "fill-green-500"
            : "fill-gray-500 group-hover:fill-green-500 group-focus-visible:text-green-500"
        }`}
      />
      <span>{likeCount}</span>
    </button>
  );
}
