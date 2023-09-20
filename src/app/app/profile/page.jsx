"use client";
import { useSession } from "next-auth/react";

export default function Profile () {

    const { data: session } = useSession();

    return (
        <div className="pt-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <img className="rounded-full" src={session?.user?.image} width={120} height={120} />
                    <h3 className="text-4xl font-semibold">{session?.user?.name}</h3>
                </div>
                <div>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-xl">Edit Profile</button>
                </div>
            </div>
        </div>
    );
}