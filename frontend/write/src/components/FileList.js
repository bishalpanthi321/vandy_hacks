import React from 'react';
import { useHookstate } from '@hookstate/core';
import { store } from "../store";

import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function FileListItem({ file, onDelete, currentFile, setCurrentFile }) {
    let icon;

    if (currentFile) {
        icon = <button className="btn btn-light btn-sm rounded-circle" onClick={setCurrentFile}>
            <FontAwesomeIcon icon={faEye} />
        </button>
    } else {
        icon = null;
    }

    return <div className="d-flex flex-row align-items-center justify-content-between p-1 px-2 gap-5" style={{ background: currentFile ? "#474747": "initial" }}>
        <span onClick={setCurrentFile}> {file.name} </span>
        <div className="d-flex flex-row gap-2">
            {icon}
            <button className="btn btn-outline-danger btn-sm rounded-circle" onClick={onDelete}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    </div>;
}

function createNewFileName(files) {
    let template = "Untitled File";
    let idx = 0;
    let fileName = `${template}.txt`;

    // Extract existing file names from the list of objects
    const existingFileNames = files.map(file => file.name);

    // Use a while loop to find a unique filename
    while (existingFileNames.includes(fileName)) {
        idx++;
        fileName = `${template} ${idx}.txt`; // Adjust to use a space before the number
    }

    return fileName;
}


function FileList() {
    let filesState = useHookstate(store.files);
    let currentFileState = useHookstate(store.currentFile);

    const addFile = () => {
        let filename = createNewFileName(filesState.get());
        filesState.set((files) => {
            return [...files, { name: filename, content: "" }];
        })
        currentFileState.set(filename)
    }

    const removeFile = (name) => {
        return () => {
            filesState.set((files) => {
                return [...files.filter((item, _) => item.name != name)];
            })
            currentFileState.set((currentFile) => {
                if (currentFile == name) {
                    return null;
                }
                return currentFile;
            })
        }
    }

    const fileListItems = [...filesState.get().map((file, _) => <FileListItem
        currentFile={currentFileState.get() == file.name}
        file={file}
        onDelete={removeFile(file.name)}
        setCurrentFile={() => { currentFileState.set(file.name) }}
    />)];

    return <div className="d-flex flex-column">
        <div className="d-flex flex-row align-items-center gap-2">
            <h3>
                <FontAwesomeIcon icon={faFile} />
            </h3>
            <h3>
                Recent Files
            </h3>
            <button className="btn btn-success rounded-circle btn-sm"
                onClick={addFile}
            >
                <FontAwesomeIcon icon={faAdd} />
            </button>
        </div>
        <div className="mt-4">
            {fileListItems}
        </div>
    </div>;

}

export default FileList
