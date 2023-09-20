"use client";
import { signOut, signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {

  const { data: session } = useSession();

  if (session) {
    return redirect("/app");
  }

  return (
    <main className="w-full flex flex-col md:flex-row">
      <div className="hidden md:flex justify-center items-center w-screen md:w-1/2 h-screen bg-gradient-to-r from-orange-500 to-violet-500 text-white">
        <div className="flex flex-col gap-4">
          <h1 className="text-8xl font-semibold">Alltalk</h1>
          <p>
            Connect with thousands of developers worldwide on make frens!
          </p>
        </div>
      </div>
      <div className="flex md:items-center w-screen md:w-1/2 h-screen p-8">
        <div className="flex flex-col gap-6 w-screen">
          <h3 className="text-2xl">Alltalk</h3>
          <h2 className="text-6xl font-semibold">Sign In</h2>
          <hr className="w-full md:w-1/2" />
          <button onClick={() => signIn("github")} className="w-full md:w-1/2 bg-orange-500 p-2 rounded-xl text-white">Sign In With GitHub</button>
          <p>
            By signing up you agree to our <a href="#" className="text-orange-500 underline">Terms and Conditions</a>.
          </p>
        </div>
      </div>
    </main>
  );

}
