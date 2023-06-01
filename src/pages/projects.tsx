import { type NextPage } from "next";
import Link from "next/link";
import { InfiniteProjectList } from "~/components/InfiniteProjectList";
import { api } from "~/utils/api";

const Projects: NextPage = () => {
  return (
    <>
      <div className="relative overflow-x-auto">
        {/* ToDo
            - Make Search bar
         */}
        <div className="mb-10 py-5">
          <Link href="/create-project" className="float-right rounded-xl border border-transparent bg-green-400/10 py-1 pl-8 pr-6">
            + List your Project
          </Link>
        </div>
        <table className="w-full px-4 text-center ">
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
            <ViewProjects />
          </tbody>
        </table>
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
