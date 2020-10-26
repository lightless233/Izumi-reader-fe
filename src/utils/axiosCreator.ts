import axios from "axios";
import config from "@/config";
import router from '@/router';
import cookies from "js-cookie";

const service = axios.create({
    baseURL: config.baseURL
});

service.interceptors.response.use(
    function (response) {
        // 每次获取到 response 的时候，检查是否是未登录状态
        // 如果是未登录，就跳转登录页
        // 否则就更新本地的 token 
        if (response.status === 200) {
            if (response.data.code && response.data.code === 6001) {
                router.push("login");
                return response;
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }
);

service.interceptors.request.use(function (config) {
    // 每次请求前，把 token 放到请求头里
    console.log("config", config);
    if (!config.url.startsWith("/api/")) {
        return config;
    }
    const token = window.localStorage.getItem("token");
    if (token === null || token === "") {
        router.push("login");
    } else {
        config.headers["X-ReaderToken"] = token;
    }

    return config;
})

export { service as axios };
