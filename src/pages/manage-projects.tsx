import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { Notify } from "notiflix";
import { InfiniteProjects } from "~/components/InfiniteProjects";
import { api } from "~/utils/api";

const ManageProjects: NextPage = () => {
  const session = useSession();
    if (session.status !== 'authenticated' || session.data.user.admin !== true) {
        // Notify.failure("Unauthorized");
        return <h2>Unauthorized</h2>
    }

  return (
    <>
      <div className="relative overflow-x-auto mx-5">
        <ViewProjects />
      </div>
    </>
  );
};

function ViewProjects() {
  const projects = api.project.infiniteFeed.useInfiniteQuery(
    {},
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
