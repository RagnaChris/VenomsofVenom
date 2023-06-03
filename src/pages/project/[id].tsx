import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  type NextPage,
} from "next";
import { useSession } from "next-auth/react";
import { Notify } from "notiflix";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const ProjectPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  projectId,
}) => {
  const session = useSession();
  let isAdmin = false;
  if (session.status === "authenticated") {
    isAdmin = session.data.user.admin;
  }

  const [projectName, setProjectName] = useState("");
  const [username, setUsername] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [supply, setSupply] = useState("");
  const [mintPrice, setMintPrice] = useState("");
  const [mintDate, setMintDate] = useState(new Date());

  const project = api.project.getProject.useQuery({
    projectId: projectId,
  });

  useEffect(() => {
    if (project.data) {
      const {
        projectName,
        username,
        twitterUrl,
        supply,
        mintPrice,
        mintDate,
      } = project.data;

      setProjectName(projectName);
      setUsername(username);
      setTwitterUrl(twitterUrl);
      setSupply(supply);
      setMintPrice(mintPrice);
      setMintDate(new Date(mintDate));
    }
  }, [project.data]);

  const updateProject = api.project.update.useMutation({
    onSuccess: () => {
      Notify.success("Project updated successfully!");
    },
    onError: (event) => {
      Notify.failure(event.message);
    },
  });

  const handleUpdate = () => {
    updateProject.mutate({
      projectId: projectId,
      projectName: projectName,
      username: username,
      twitterUrl: twitterUrl,
      supply: supply,
      mintPrice: mintPrice,
      mintDate: mintDate,
    });
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="relative grid grid-cols-5 gap-3 font-bold"
    >
      <div className="col-start-2 col-span-3 mr-24 gap-4">
        <div className="flex flex-col">
          <label htmlFor="projectName">Project Name</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required={isAdmin}
            readOnly={!isAdmin}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required={isAdmin}
            readOnly={!isAdmin}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="twitterUrl">Twitter URL</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="twitterUrl"
            value={twitterUrl}
            onChange={(e) => setTwitterUrl(e.target.value)}
            required={isAdmin}
            readOnly={!isAdmin}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="supply">Project Supply</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="supply"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            required={isAdmin}
            readOnly={!isAdmin}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mintPrice">Mint Price</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="text"
            id="mintPrice"
            value={mintPrice}
            onChange={(e) => setMintPrice(e.target.value)}
            required={isAdmin}
            readOnly={!isAdmin}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mintDate">Mint Date</label>
          <input
            className="rounded-md bg-green-300/10 px-3"
            type="date"
            id="mintDate"
            value={mintDate.toISOString().substr(0, 10)}
            onChange={(e) => setMintDate(new Date(e.target.value))}
            required={isAdmin}
            readOnly={!isAdmin}
          />
        </div>
      </div>
      <button
        type="submit"
        className=" col-start-3 mt-5 flex justify-center rounded-md border border-transparent bg-green-300/10"
        hidden={!isAdmin}
      >
        Save and Upload
      </button>
    </form>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const projectId = context.params?.id;

  if (projectId == null) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      projectId,
    },
  };
}

export default ProjectPage;