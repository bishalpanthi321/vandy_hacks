import React from 'react';
import { useHookstate } from '@hookstate/core';
import { store } from "../store";

import { faFile, faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';

function FileListItem({ file, onDelete, currentFile, setCurrentFile, onRename }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newFileName, setNewFileName] = useState(file.name);
    const inputRef = useRef(null);
 
    const handleEdit = () => {
      if (isEditing) {
        if (newFileName.trim() !== '') {
          onRename(newFileName); // Call with only new name
        }
      }
      setIsEditing(!isEditing);
    };  
 
    useEffect(() => {
      if (isEditing && inputRef.current) {
        inputRef.current.focus();
       
        // Find the index of the last dot to position the cursor before it
        const dotIndex = newFileName.lastIndexOf('.');
        const cursorPosition = dotIndex !== -1 ? dotIndex : newFileName.length; // Fallback to end if no dot
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, [isEditing]);
 
    useEffect(() => {
      setNewFileName(file.name);
    }, [file.name]);
 
    let icon;
 
    if (currentFile) {
      icon = (
        <button className="btn btn-light btn-sm rounded-circle" onClick={setCurrentFile}>
          <FontAwesomeIcon icon={faEye} />
        </button>
      );
    } else {
      icon = (
        <button className="btn btn-outline-light btn-sm rounded-circle" onClick={setCurrentFile}>
          <FontAwesomeIcon icon={faEyeSlash} />
        </button>
      );
    }
 
    return (
      <div className="d-flex flex-row align-items-center justify-content-between py-1">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleEdit();
              }
            }}
          />
        ) : (
          <span>{file.name}</span>
        )}
 
        <div className="d-flex flex-row gap-2">
          {icon}
          <button className="btn btn-outline-light btn-sm rounded-circle" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-outline-danger btn-sm rounded-circle" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
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
    const [files, setFiles] = useState([]);
    const [currentFile, setCurrentFile] = useState("");
 
    const removeFromFiles = (name) => {
      return () => {
        setFiles(files.filter((item, _) => item.name != name));
        if (currentFile == name) {
          setCurrentFile(null);
        }
      }
    }
 
    const addFile = () => {
      setFiles([...files, { name: createNewFileName(files), content: "" }]);
    }
 
    const renameFile = (oldName, newName) => {
      if (newName.trim() === '') return; // Prevent renaming to an empty name
   
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.name === oldName ? { ...file, name: newName } : file
        )
      );
   
      // Update currentFile if the renamed file is currently selected
      if (currentFile === oldName) {
        setCurrentFile(newName);
      }
    };
   
    const fileListItems = files.map((file) => (
      <FileListItem
        key={file.name}
        currentFile={currentFile === file.name}
        file={file}
        onDelete={removeFromFiles(file.name)}
        setCurrentFile={() => {
          setCurrentFile(file.name);
        }}
        onRename={(newName) => renameFile(file.name, newName)} // Pass rename function
      />
    ));
 
    return <div class="d-flex flex-column">
      <div class="d-flex flex-row align-items-center gap-2">
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