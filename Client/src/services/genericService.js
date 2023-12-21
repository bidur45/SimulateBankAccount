import { baseURL, del, get, post, put } from "./api";

const api = (endpoint, url = baseURL + endpoint) => ({
    get: (options) => get(url, options),
    getById: (id, options) => get(`${url}/${id}`, options),
    post: (data, options) => post(url, data, options),
    put: (id, data, options) => put(`${url}/${id}`, data, options),
    delete: (id, options) => del(`${url}/${id}`, options),
});

export default api;
