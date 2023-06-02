import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiFillLike, AiOutlineLike, AiOutlineTwitter } from "react-icons/ai";
import { api } from "~/utils/api";
import Image from "next/image";
import { Notify } from "notiflix";

type Project = {
  id: string;
  projectName: string;
  username: string;
  twitterUrl: string;
  imageUrl: string;
  supply: string;
  mintPrice: string;
  mintDate: Date;
  likeCount: number;
  likedByMe: boolean;
  userProfileImageUrl: string | undefined;
  userFollowersCount: number | undefined;
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
  if (isLoading)
    return <h1 className="my-8 flex justify-center">Loading...</h1>;
  if (isError) return <h1 className="my-8 flex justify-center">Error...</h1>;

  if (projects == null || projects.length === 0) {
    return (
      <h2 className="my-8 flex justify-center text-2xl text-gray-500">
        No Projects
      </h2>
    );
  }

  return (
    <InfiniteScroll
      dataLength={projects.length}
      next={fetchMoreProjects}
      hasMore={hasMore}
      loader={"Loading..."}
    >
      <table className="mx-4 w-full px-4 text-center">
        <thead>
          <tr>
            <th className="px-6 py-4"></th>
            <th className="px-6 py-4"></th>
            <th className="px-6 py-4 text-left">Project Name</th>
            <th className="px-6 py-4">Supply</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Community</th>
            <th className="px-6 py-4">Interest</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => {
            const toggleLike = api.project.toggleLike.useMutation({
              onSuccess: () => {
                Notify.success("Project query success!");
              },
              onError: (event) => {
                Notify.failure(event.message);
              },
            });

            function handleToggleLike() {
              toggleLike.mutate({ id: project.id });
            }
            return (
              <tr key={project.id}>
                <td className="text-bold">{index + 1}</td>
                <td>
                  <Image
                    src={project.userProfileImageUrl || project.imageUrl}
                    alt={project.projectName}
                    className="rounded-full"
                    width={20}
                    height={20}
                  />
                </td>
                <td className="text-left">{project.projectName}</td>
                <td>{project.supply}</td>
                <td>{project.mintPrice}</td>
                <td className="flex items-center justify-center">
                  <AiOutlineTwitter className="fill-green-500" />
                  <span>project.userFollowersCount</span>
                </td>
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
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

type LikeButtonProps = {
  onClick: () => void;
  isLoading: boolean;
  likedByMe: boolean;
  likeCount: number;
};

function LikeButton({
  onClick,
  isLoading,
  likedByMe,
  likeCount,
}: LikeButtonProps) {
  const session = useSession();
  const LikeIcon = likedByMe ? AiFillLike : AiOutlineLike;
  if (session.status !== "authenticated") {
    return (
      <div className="flex justify-center items-center">
        <LikeIcon />
        <span>{likeCount}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <button
        disabled={isLoading}
        onClick={onClick}
        className={`group flex items-center justify-center gap-1 self-center transition-colors duration-200 
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
    </div>
  );
}
