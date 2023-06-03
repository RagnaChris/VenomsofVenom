import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { InfiniteProjects } from "~/components/InfiniteProjects";
import { api } from "~/utils/api";

const ManageProjects: NextPage = () => {
  const session = useSession();
  if (session.status !== "authenticated" || session.data.user.admin !== true) {
    return <h2>Unauthorized</h2>;
  }

  return (
    <>
      <div className="relative mx-5 overflow-x-auto">
        <h1 className="mb-4 text-lg">Manage Projects</h1>
        <ViewProjects />
      </div>
    </>
  );
};

function ViewProjects() {
  const projects = api.project.infiniteFeed.useInfiniteQuery(
    { name: "" },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteProjects
      projects={projects.data?.pages.flatMap((page) => page.projects)}
      isError={projects.isError}
      isLoading={projects.isLoading}
      hasMore={projects.hasNextPage}
      fetchMoreProjects={projects.fetchNextPage}
    />
  );
}

export default ManageProjects;
