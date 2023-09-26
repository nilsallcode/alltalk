import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET (request, { params }) {

    const postId = parseInt(params.postId);

    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const replies = await prisma.reply.findMany({
        where: { postId: postId },
        include: { user: true }
    });

    return NextResponse.json(replies, { status: 200 });
}