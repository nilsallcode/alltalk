import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST (request) {

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email }
    });

    const postData = await request.json();

    if (!postData.content) {
        return NextResponse.json({ message: "Empty fields." }, { status: 400 });
    }

    if (postData.content.length > 280) {
        return NextResponse.json({ message: "Too many characters, max 280." }, { status: 400 }); 
    }

    try {
        await prisma.post.create({
            data: {
                user: {
                    connect: {
                        id: user.id
                    }
                },
                content: postData.content
            }
        });
    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { message: "An issue occurred on our end, please try again soon." },
            { status: 500 }
        );
    }

    return NextResponse.json({ message: "Created post successfully" }, { stats: 200 });
}