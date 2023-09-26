import axios from "axios";

export async function createPost (formData) {
    const { data } = await axios.post("/api/create-post", formData);
    return data;
}