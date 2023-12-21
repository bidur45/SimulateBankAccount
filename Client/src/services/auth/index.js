import { baseURL, get, post } from "../api";

export const login = (data, options) =>
    post(baseURL + "/auth/authenticate", data, options);

export const currentUser = (options) => get(baseURL + "/auth", options);
