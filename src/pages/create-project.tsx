import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import NewProjectForm from "~/components/NewProjectForm";

const CreateProject: NextPage = () => {
  const session = useSession();
  if (session.status !== "authenticated" || session.data.user.admin !== true) {
    return (
      <>
        <div className="flex flex-col items-center space-y-3 py-20 text-3xl">
          <h2>Join Our Discord</h2>
          <iframe
            src="https://discord.com/widget?id=1121127044072358023&theme=dark"
            width="350"
            height="500"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </>
    );
  }

  return <NewProjectForm />;
};

export default CreateProject;
