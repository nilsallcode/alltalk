import axios from "axios";

export async function getPosts () {
    const { data } = await axios.get("/api/get-posts");
    return data;
}