import { store } from './../store';
export const server = "http://localhost:8000";

export function get_id(url) {
    return +url.split("/").reverse()[0];
}

export async function token_aware_fetch(resource, options) {
    let encoded_token = localStorage.getItem("token");
    if (encoded_token === null) {
        return fetch(resource, options);
    } else {
        let token = JSON.parse(encoded_token);
        let headers = { ...options?.headers ?? {}, Authorization: `Token ${token.token}` };
        let extended_options = options ?? {};
        extended_options.headers = headers;
        const response = await fetch(resource, extended_options);
        if (response.status === 401) {
            logout(store.token);
        }
        return response;
    }
}

export async function login(email, password) {
    let body = JSON.stringify({ email, password });
    let response = await fetch(`${server}/api/token`, {
        "headers": { "Content-Type": "application/json" },
        "method": "POST",
        "body": body,
    });
    return response;
}

export async function logout(token) {
    await token_aware_fetch(`${server}/api/token`, {
        "method": "DELETE",
    });
    token.set(null);
    localStorage.removeItem("token");
}

export async function list_documents(token)  {
    let response = await token_aware_fetch(`${server}/api/document`, {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
    });
    return await response.json();
}

export async function get_suggestion(token, document_id)  {
    let response = await token_aware_fetch(`${server}/api/document/${document_id}/suggest`, {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
    });
    return await response.json();
}

