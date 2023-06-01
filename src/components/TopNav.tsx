import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function TopNav() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <nav className="top-0 w-full px-2 py-4">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4 px-10">
        <Link href="/">
            <Image src="/assets/venom.png" alt="Venoms of Venom" width={100} height={100}/>
        </Link>
        <ul className="flex flex-row flex-wrap items-start gap-7 whitespace-nowrap">
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
          ) : (
            <li>
              <button onClick={() => void signOut()}>SignOut</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
