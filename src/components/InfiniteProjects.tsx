import { useSession } from "next-auth/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "~/utils/api";
import Image from "next/image";
import { Notify } from "notiflix";

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
      <table className="mx-4 w-full px-4 text-center">
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

            function handleEdit() {
              console.log("Edit..Not yet implemented!");
            }

            return (
              <tr key={project.id}>
                <td>
                  <Image
                    src={project.imageUrl}
                    alt={project.projectName}
                    className="rounded-full"
                    width={20}
                    height={20}
                  />
                </td>
                <td className="text-left">{project.projectName}</td>
                <td>
                  <button
                    className="rounded-lg border border-black bg-gradient-to-b from-green-500 via-emerald-400 to-cyan-300 px-5 py-4 text-center text-2xl font-bold text-black"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="mx-10 rounded-lg border border-x-emerald-300 border-b-teal-500 border-t-green-400 px-10 py-4 text-center text-2xl font-bold"
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
