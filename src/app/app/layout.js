"use client";
import { signOut, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function AppLayout ({ children }) {
    const { data: session } = useSession();

    if (!session) {
        return redirect("/");
    }

    return (
        <>
            <nav className="px-8 py-4 flex justify-between items-center shadow-md">
                <div className="flex gap-4">
                    <p className="font-semibold">Alltalk</p>
                    <Link href="" className="text-gray-500 hover:text-gray-800">Home</Link>
                    <Link href="" className="text-gray-500 hover:text-gray-800">Explore</Link>
                    <Link href="" className="text-gray-500 hover:text-gray-800">New Post</Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="" className="text-gray-500 hover:text-gray-800">Notifications</Link>
                    <Link href="/app/profile">
                        <Image className="rounded-full" src={session?.user?.image} width={40} height={40} />
                    </Link>
                </div>
            </nav>
            <main className="px-24">
                {children}
            </main>
        </>
    );

}