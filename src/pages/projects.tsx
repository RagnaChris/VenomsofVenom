import { type NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { InfiniteProjectList } from "~/components/InfiniteProjectList";
import { api } from "~/utils/api";

const Projects: NextPage = () => {
  const [findName, setFindName] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleButtonClick = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <div className="relative mx-5 overflow-x-auto">
        <div className="mb-10 flex justify-end gap-5 py-5">
          <div className="flex">
            <input
              className="w-full rounded-l-md bg-green-300/10 px-3 text-xs md:text-base"
              placeholder="Search Project"
              type="text"
              id="findName"
              value={findName}
              onChange={(e) => setFindName(e.target.value)}
            />
            <button
              onClick={handleButtonClick}
              className="rounded-r-md bg-green-300/40 px-3 py-2"
            >
              <AiOutlineSearch />
            </button>
          </div>
          <Link
            href="/create-project"
            className="float-right flex rounded-xl border border-transparent bg-green-400/10 py-1 pl-8 pr-6 text-xs md:text-base"
          >
            <span className="mr-2 self-center text-xl md:text-sm">+</span>
            <p>List your Project</p>
          </Link>
        </div>
        <ViewProjects findName={findName} />
      </div>
    </>
  );
};

type ViewProjectsProps = {
  findName: string;
};

function ViewProjects({ findName }: ViewProjectsProps) {
  const projects = api.project.infiniteFeed.useInfiniteQuery(
    { name: findName },
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
