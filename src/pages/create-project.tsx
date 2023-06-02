import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import NewProjectForm from "~/components/NewProjectForm";

const CreateProject: NextPage = () => {
    const session = useSession();
    if (session.status !== 'authenticated' || session.data.user.admin !== false) {
        return <h2>Check Discord</h2>
    }

    return <NewProjectForm />
};

export default CreateProject