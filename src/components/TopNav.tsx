import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";

export function TopNav() {
  const session = useSession();
  const user = session.data?.user;
  return (
    <nav className="relative top-0 w-full px-2 py-4">
      <div className="mx-auto flex flex-wrap items-center justify-between p-4 px-10">
        <Link href="/">
          <Image
            src="/assets/venom.png"
            alt="Venoms of Venom"
            width={100}
            height={100}
          />
        </Link>
        <div className="flex flex-col">
          <button
            className="md:hidden"
            onClick={() => {
              document
                .getElementById("navbar-menu")
                ?.classList.toggle("hidden");
            }}
          >
            <AiOutlineMenu />
          </button>
          <ul
            id="navbar-menu"
            className="hidden items-start gap-7 whitespace-nowrap md:flex md:flex-row md:flex-wrap"
          >
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
              <>
                {user.admin && (
                  <Link href="/manage-projects">Manage Projects</Link>
                )}
                <li>
                  <button onClick={() => void signOut()}>SignOut</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
