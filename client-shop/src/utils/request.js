import axios from "axios";
import { getToken } from './auth'

const instance = axios.create({
    baseURL:'http://localhost:3009',
    timeout:5000
})
// 全局请求拦截，添加token在所有请求的header中
instance.interceptors.request.use(function (config) {
    config.headers['authorization'] = 'Bearer ' + getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});

//全局响应拦截
instance.interceptors.response.use(function (response) {
    return response;
},function (error) {
    return Promise.reject(error);
});

export function get(url,params) {
    return instance.get(url, {
        params
    })
}

export function post(url, data) {
    return instance.post(url, data)
}

export function put(url, data) {
    return instance.put(url, data)
}

export function del(url) {
    return instance.delete(url)
}