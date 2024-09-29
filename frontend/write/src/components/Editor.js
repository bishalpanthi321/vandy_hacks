import ReactQuill from "react-quill";
import React, { useEffect } from "react";
import { useHookstate } from "@hookstate/core";
import { store } from "../store";
import { faMagicWandSparkles } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { faBook } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get_suggestion } from "../api/utils";

function Preview({ dataState }) {
  return <div className="pt-5" dangerouslySetInnerHTML={{ __html: dataState.get() }} />
}

function Suggestion() {
  const tokenState = useHookstate(store.token);
  const filesState = useHookstate(store.files);
  const currentFileState = useHookstate(store.currentFile);

  let filename = currentFileState.get();
  let file = [...filesState.get()].filter((file) => file.filename == filename);

  const suggestion = useHookstate("");

  useEffect(() => {
    let network_request = async () => {
      if (file.length !== 0) {
        let sug = await get_suggestion(tokenState.get(), file[0].id);
        suggestion.set(sug);
      }
    }
    network_request();
  }, [filesState, currentFileState, tokenState]);

  return <span class="pt-5"> {suggestion.get()} </span>;
}

function PreviewOrSuggestions({ dataState, filesState, currentFileState }) {
  let previewState = useHookstate(false);

  let buttonGroup = <div class="d-flex flex-row gap-2 m-2 ms-auto">
    <button class={"btn btn-success btn-sm rounded-pill btn-success"}
      onClick={() => previewState.set(false)}>
      <FontAwesomeIcon icon={faMagicWandSparkles} />
      &nbsp;
      Suggestions
    </button>
    <button class={"btn btn-sm rounded-pill btn-outline-success"}
      onClick={() => previewState.set(true)}>
      <FontAwesomeIcon icon={faBook} />
      &nbsp;
      Preview
    </button>
  </div>


  if (previewState.get()) {
    return <>
      {buttonGroup}
      <Preview dataState={dataState} filesState={filesState} currentFileState={currentFileState} />
    </>;
  } else {
    return <>
      {buttonGroup}
      <Suggestion />
    </>;
  }
}

export default function Editor() {
  const tokenState = useHookstate(store.token);
  const filesState = useHookstate(store.files);
  const currentFileState = useHookstate(store.currentFile);
  const dataState = useHookstate("");

  useEffect(() => {
    let currentFile = currentFileState.get();
    if (currentFile !== null) {
      let file = filesState.get().find((file) => file.filename === currentFile);
      dataState.set(file.data);
    }
  }, [tokenState, currentFileState, dataState, filesState]);

  const handleChange = (value) => {
    if (currentFileState.get() !== null) {
      filesState.set((files) => {
        let idx = files.findIndex(
          (file) => file.filename == currentFileState.get()
        );
        files[idx].data = value;
        return files;
      });
    }
  };

  return (
    <div className="d-flex flex-grow-1 flex-row">
      <ReactQuill
        style={{ width: "60%" }}
        value={dataState.get()}
        onChange={handleChange}
        readOnly={currentFileState.get() == null}
      />
      <div
        style={{ width: "40%", backgroundColor: "rgb(237, 237, 237)" }}
        className="px-3 d-flex flex-column"
      >
        <PreviewOrSuggestions dataState={dataState} />
      </div>
    </div>
  );
}
