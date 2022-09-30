import api from "../api.js";

export async function getArticleByTitle(title) {
    const url = `/articles/search/${title || ""}`;
    const response = await api.get(url);
    return response;
}

export async function createRandomArticles() {
    const url = `/articles/random`;
    const response = await api.get(url);
    return response;
}

export async function createRandomUsers() {
    api.interceptors.request.use(function (config) {
        return config;
    });

    const url = `/users/random`;
    const response = await api.get(url);
    return response;
}

export async function editArticle(articleObj) {
    const { id, title, body } = articleObj;
    const url = `/articles/${id || ""}`;
    const response = await api.put(url, {
        title,
        body,
    });
    return response;
}

export async function deleteAllArticles() {
    const url = `/articles/0`;
    const response = await api.delete(url);
    return response;
}

export async function deleteAllUsers() {
    const url = `/users/0`;
    const response = await api.delete(url);
    return response;
}
