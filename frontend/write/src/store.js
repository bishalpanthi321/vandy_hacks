import { hookstate } from '@hookstate/core';

function getTokenFromLocalStorage() {
    let storage = localStorage.getItem("token");
    if (storage === null) {
        return null;
    } else {
        return JSON.parse(storage);
    }
};

export const store = hookstate({
    token: getTokenFromLocalStorage(),
    currentFile: null,
    files: [],
});
