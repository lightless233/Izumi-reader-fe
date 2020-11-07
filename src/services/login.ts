import { axios } from "@/utils/axiosCreator";

async function doLogin(data: object) {
    return await axios.post("/login", data);
}

export {
    doLogin
}