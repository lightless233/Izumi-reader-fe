import { axios } from "@/utils/axiosCreator";

const APIS = {
    add: "/v1/feed/add",
}

export async function addFeed(data: object) {
    return await axios.post(APIS.add, data);
}
