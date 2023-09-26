import axios from "axios";

export async function getPostReplies (postId) {
    const { data } = await axios.get("/api/get-post-replies/" + postId);
    return data;
}