import { get, post } from "../api";

export async function getSales(options) {
    return get("https://api.sampleapis.com/thestates/the-states", options);
}

export async function outLogin(options) {
    return post("/api/login/outLogin", null, options);
}

export async function login(body, options) {
    return request("/api/login/account", body, options);
}
