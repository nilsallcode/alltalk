import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST (request, { params }) {
    
    const postId = parseInt(params.postId);
    const replyData = await request.json();

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email }
    });

    if (!replyData.content) {
        return NextResponse.json({ message: "You've left empty fields." }, { status: 400 });
    }

    try {

        await prisma.reply.create({
            data: {
                post: {
                    connect: {
                        id: postId
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                },
                content: replyData.content
            }
        });

        return NextResponse.json({ message: "Successfully replied to post." }, { status: 200 });

    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { message: "An issue occurred on our end, please try again soon." },
            { status: 500 }
        );
    }

}