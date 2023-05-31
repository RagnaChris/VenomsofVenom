import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function TopNav() {
    const session = useSession()
    const user = session.data?.user
    return <nav className="top-0 px-2 py-4 w-full">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4 px-10">
            <Link href="/">
                Image
            </Link>
            <ul className="flex flex-wrap flex-row items-start gap-7 whitespace-nowrap">
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/projects">Projects</Link>
                    {/* <Link href={`/projects/${project.id}`}>Project</Link> */}
                </li>
                {user == null ? (
                    <li>
                        <button onClick={() => void signIn()}>SignIn</button>
                    </li>
                ): (
                    <li>
                        <button onClick={() => void signOut()}>SignOut</button>
                    </li>
                )}
            </ul>
        </div>
    </nav>
}