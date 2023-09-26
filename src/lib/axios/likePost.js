import axios from "axios";

export async function likePost (postId) {
    const { data } = await axios.post("/api/like-post/" + postId);
    return data;
}