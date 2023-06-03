import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "~/utils/api";
import Image from "next/image";
import { Notify } from "notiflix";
import { useRouter } from "next/router";
import Link from "next/link";

type Project = {
  id: string;
  projectName: string;
  imageUrl: string;
};

type InfiniteProjectsProp = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchMoreProjects: () => Promise<unknown>;
  projects?: Project[];
};

export function InfiniteProjects({
  projects,
  isError,
  isLoading,
  hasMore = false,
  fetchMoreProjects,
}: InfiniteProjectsProp) {
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
      <table className="w-full px-4 text-center border-collapse">
        <tbody>
          {projects.map((project, index) => {
            const deleteProject = api.project.delete.useMutation({
              onSuccess: () => {
                Notify.success("Project deleted successfully!");
              },
              onError: (event) => {
                Notify.failure(event.message);
              },
            });

            function handleDelete() {
              deleteProject.mutate({ id: project.id });
            }

            return (
              <tr key={project.id} className="bg-green-300/10 px-3">
                <td className="rounded-s-lg pl-4">
                  <Image
                    src={project.imageUrl}
                    alt={project.projectName}
                    className="rounded-full"
                    width={20}
                    height={20}
                  />
                </td>
                <td className="text-left">{project.projectName}</td>
                <td className="py-4">
                  <Link
                    className="-mr-28 w-28 rounded-lg border border-black bg-gradient-to-b from-green-500 via-emerald-400 to-cyan-300 text-center font-bold text-black"
                    href={`/project/${project.id}`}
                  >
                    Edit
                  </Link>
                </td>
                <td className="rounded-e-lg">
                  <button
                    className="-mr-10 w-28 rounded-lg border border-x-emerald-300 border-b-teal-500 border-t-green-400 text-center font-bold"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}
