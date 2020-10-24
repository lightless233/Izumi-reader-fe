import axios from "axios";
import config from "@/config";
import router from '@/router';
import cookies from "js-cookie";

const service = axios.create({
    baseURL: config.baseURL
});

service.interceptors.response.use(
    function (response) {
        if (response.status === 200) {
            if (response.data.code && response.data.code === 6001) {
                router.push("login");
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    }
);

service.interceptors.request.use(function (config) {
    config.headers["X-READER-AUTH"] = cookies.get("X-READER-AUTH");
    return config;
})

export { service as axios };
