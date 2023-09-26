"use client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { replyToPost } from "@/lib/axios/replyToPost";
import { useState } from "react";
import { getPostReplies } from "@/lib/axios/getPostReplies";

export default function Reply ({ post }) {

    const [formData, setFormData] = useState("");
    const [showReplies, setShowReplies] = useState(false);

    const getReplies = () => {
        replies.refetch();
        setShowReplies(true);
    };

    const replies = useQuery({
        queryKey: ['replies', post.id],
        queryFn: () => getPostReplies(post.id),
        enabled: false
    })

    const newReply = useMutation({
        mutationFn: (postId) => {
            replyToPost(postId, { content: formData });
            setFormData("");
        },
        onSuccess: getReplies
    });

    const handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            newReply.mutate(post.id);
        }
    };

    return (
        <>
            {newReply.isError ? <p>test error</p> : null}
            <input onKeyDown={handleEnterKey} value={formData} onChange={(e) => setFormData(e.target.value)} type="text" placeholder="Reply..." className="outline-none bg-gray-200 p-2 rounded-xl w-full" />
            
            {showReplies ? (
                <div className="mt-2">
                    {replies.isSuccess ? (
                        <div className="flex flex-col gap-4">
                            {replies.data.length < 1 ? <p>This post has no replies yet.</p> : null}
                            {replies.data.map((reply, index) => (
                                <div className="flex flex-col gap-2 pt-4 pl-4 border-t-2 border-gray-200" key={index}>
                                    <div className="flex gap-2 items-center">
                                        <img src={reply.user.image} width={40} height={40} className="rounded-full" />
                                        <p className="font-semibold">{reply.user.name}</p>
                                    </div>
                                    <div>
                                        <p>{reply.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null }
                    <button onClick={() => setShowReplies(false)} className="underline font-semibold mt-2">Hide replies</button>
                </div>
            ) : (
                <div>
                    <button onClick={getReplies} className="underline font-semibold">Show replies</button>
                </div>
            )}
        </>
    )
}