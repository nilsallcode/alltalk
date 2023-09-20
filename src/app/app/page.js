"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function App () {

    const { data: session } = useSession();

    return (
        <div>
            <p>{session?.user?.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
}