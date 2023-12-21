import { request } from "@umijs/max";
import { notification } from "antd";

export const baseURL = process.env.baseURL || "https://localhost:7270/api";

export async function get(url, params, cb = () => {}, options) {
    const token = localStorage.getItem("token");

    try {
        const res = await request(url, {
            method: "GET",
            params,
            headers: {
                Authorization: "Bearer " + token,
            },
            ...options,
        });
        cb(res?.data);
        return res || {};
    } catch (ex) {
        console.log(ex);
        switch (ex.response.status) {
            case 500:
            case 404:
            case 401:
                notification["error"]({
                    message: "Error",
                    description: ex.response.statusText,
                });
            default:
                break;
        }
    }
}

export async function post(url, data, cb = () => {}, options = {}) {
    const token = localStorage.getItem("token");

    try {
        const res = request(url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + token,
            },
            data,
            ...options,
        });

        cb(res?.data);
        return res || {};
        // show messages
    } catch (ex) {
        console.log(ex);
    }
}

export async function put(url, data, cb = () => {}, options = {}) {
    const token = localStorage.getItem("token");

    try {
        const res = request(url, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + token,
            },

            data,
            ...options,
        });

        cb(res?.data);
        return res || {};
        // show messages
    } catch (ex) {
        console.log(ex);
    }
}

export async function del(url, cb = () => {}, options) {
    const token = localStorage.getItem("token");

    try {
        const res = await request(url, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },

            ...options,
        });
        cb(res?.data);
        return res || {};
    } catch (ex) {
        console.log(ex);
        switch (ex.response.status) {
            case 500:
            case 404:
            case 401:
                notification["error"]({
                    message: "Error",
                    description: ex.response.statusText,
                });
            default:
                break;
        }
    }
}
