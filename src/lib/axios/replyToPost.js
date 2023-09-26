import axios from "axios";

export async function replyToPost (postId, formData) {
    const { data } = await axios.post("/api/reply-to-post/" + postId, formData);
    return data;
}