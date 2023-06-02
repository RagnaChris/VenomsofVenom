import { type NextPage } from "next";
import Link from "next/link";
import { InfiniteProjectList } from "~/components/InfiniteProjectList";
import { api } from "~/utils/api";

const Projects: NextPage = () => {
  return (
    <>
      <div className="relative overflow-x-auto mx-5">
        {/* ToDo
            - Make Search bar
         */}
        <div className="mb-10 py-5">
          <Link href="/create-project" className="float-right rounded-xl border border-transparent bg-green-400/10 py-1 pl-8 pr-6">
            + List your Project
          </Link>
        </div>
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
    <InfiniteProjectList
      projects={projects.data?.pages.flatMap((page) => page.projects)}
      isError={projects.isError}
      isLoading={projects.isLoading}
      hasMore={projects.hasNextPage}
      fetchMoreProjects={projects.fetchNextPage}
    />
  );
}

export default Projects;
