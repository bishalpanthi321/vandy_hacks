import ReactQuill from 'react-quill';
import React from 'react';
import { useHookstate } from '@hookstate/core';
import { store } from "../store";

export default function Editor() {
    const dataState = useHookstate(store.data);

    const handleChange = (value) => {
        dataState.set(value);
    };

    return <div className="d-flex flex-grow-1 flex-row m-2 h-100">
        <ReactQuill style={{ width: "60%" }} value={dataState.get()} onChange={handleChange} />
        <div style={{ width: "40%", backgroundColor: "rgb(237, 237, 237)" }} className="px-5">
            <div dangerouslySetInnerHTML={{ __html: dataState.get() }} />
        </div>
    </div>;
}
