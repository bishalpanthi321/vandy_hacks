import { hookstate } from '@hookstate/core';

export const store = hookstate({
    token: null,
    currentFile: null,
    files: [],
    data: "",
});
