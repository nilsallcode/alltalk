import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST (request, { params }) {
    
    const postId = parseInt(params.postId);

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: { email: session?.user?.email }
    });

    try {

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return NextResponse.json(
                { message: "The post you are trying to like does not exist." }, 
                { stats: 400 });
        }

        const like = await prisma.like.findFirst({
            where: { postId: post.id, userId: user.id }
        });

        if (like) {
            await prisma.like.delete({
                where: { id: like.id }
            });

            return NextResponse.json({ message: "Post has been unliked" }, { stats: 200 });
        } else {
            await prisma.like.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    post: {
                        connect: {
                            id: post.id
                        }
                    },
                }
            });

            return NextResponse.json({ message: "Post has been liked" }, { stats: 200 });
        }

    } catch (error) {
        console.log(error.message);
        return NextResponse.json(
            { message: "An issue occurred on our end, please try again soon." },
            { status: 500 }
        );
    }

}