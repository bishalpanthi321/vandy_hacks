import ReactQuill from "react-quill";
import React, { useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import { store } from "../store";

export default function Editor() {
  const filesState = useHookstate(store.files);
  const currentFileState = useHookstate(store.currentFile);
  const dataState = useHookstate("");

  useEffect(() => {
    let currentFile = currentFileState.get();
    if (currentFile !== null) {
      let file = filesState.get().find((file) => file.name === currentFile);
      dataState.set(file.data);
    }
  }, [currentFileState, dataState, filesState]);

  const handleChange = (value) => {
    if (currentFileState.get() !== null) {
      filesState.set((files) => {
        let idx = files.findIndex(
          (file) => file.name == currentFileState.get()
        );
        files[idx].data = value;
        return files;
      });
    }
  };

  return (
    <div className="d-flex flex-grow-1 flex-row m-2 h-100">
      <ReactQuill
        style={{ width: "60%" }}
        value={dataState.get()}
        onChange={handleChange}
        readOnly={currentFileState.get() == null}
      />
      <div
        style={{ width: "40%", backgroundColor: "rgb(237, 237, 237)" }}
        className="px-5"
      >
        <div dangerouslySetInnerHTML={{ __html: dataState.get() }} />
      </div>
    </div>
  );
}
