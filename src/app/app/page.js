"use client";
import { useSession } from "next-auth/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createPost } from "@/lib/axios/createPost";
import Link from "next/link";
import { getPosts } from "@/lib/axios/getPosts";
import { likePost } from "@/lib/axios/likePost";
import Reply from "@/components/post/Reply";

export default function App () {

    const { data: session } = useSession();
    
    const [formData, setFormData] = useState("");

    const posts = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    });

    const newPost = useMutation({
        mutationFn: () => {
            createPost({ content: formData });
            setFormData("");
        },
        onSuccess: posts.refetch
    });

    const like = useMutation({
        mutationFn: (postId) => likePost(postId),
        onSuccess: posts.refetch
    });

    const formatDate = (date) => {
        let formatedDate = new Date(Date.parse(date)); 
        return formatedDate.toUTCString();
    };

    return (
        <div className="py-8 grid grid-cols-4 gap-4">
            <div>
                <div className="flex flex-col gap-2 p-4 bg-white rounded-xl shadow-md">
                    <img className="rounded-full" src={session?.user?.image} width={80} height={80} />
                    <h3 className="text-4xl font-semibold">{session?.user?.name}</h3>
                    <Link href="/app/profile" className="bg-orange-500 w-[8rem] text-white px-4 py-2 rounded-xl">View Profile</Link>
                </div>
            </div>
            <div className="col-span-2 flex flex-col gap-8">
                <div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-md">
                    <h3 className="text-gray-700 text-xl">What's on your mind?</h3>
                    {newPost.isLoading ? <p>Posting ...</p> : null}
                    {newPost.isError ? <p>There was an problem making your post.</p> : null}
                    {newPost.isSuccess ? <p className="bg-green-500 p-2 rounded-xl text-white">Successfully created post!</p> : null}
                    <div className="grid grid-cols-6 gap-2">
                        <div className="col-span-5">
                            <input value={formData} onChange={(e) => setFormData(e.target.value)} type="text" placeholder="I had a great day today..." className="outline-none bg-gray-200 p-2 rounded-xl w-full" />
                        </div>
                        <div className="col-span-1">
                            <button onClick={() => newPost.mutate()} className="bg-orange-500 w-full text-white px-4 py-2 rounded-xl">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {posts.isLoading ? <p>Loading ... </p> : null}
                    {posts.isError ? <p>There was a problem fetching your feed.</p> : null}
                    {posts.isSuccess ? (
                        <>
                            {posts.data.map((post, index) => (
                                <div className="flex flex-col gap-4 p-4 bg-white rounded-xl shadow-md" key={index}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <img className="rounded-full" src={post.user.image} width={60} height={60} />
                                            <p className="text-xl">{post.user.name}</p>
                                        </div>
                                        <div>
                                            {formatDate(post.created_at)}
                                        </div>
                                    </div>
                                    <p>{post.content}</p>
                                    <hr />
                                    <button onClick={() => like.mutate(post.id)} className="p-2 bg-gray-100 w-1/4">{post.likes.length} Likes</button>
                                    <Reply post={post} />
                                </div>
                            ))}
                        </>
                    ) : null}
                </div>
            </div>
            <div>
                <div className="flex flex-col gap-2 p-2 bg-white rounded-xl shadow-md">
                    <p>test</p>
                </div>
            </div>
        </div>
    );
}