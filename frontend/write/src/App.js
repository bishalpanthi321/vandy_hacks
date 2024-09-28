// Editor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import styles
import { faFile } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { faAdd } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { faSignIn } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function FileListItem({ file, onDelete, currentFile, setCurrentFile }) {
  let icon;

  if (currentFile) {
    icon = <button class="btn btn-light btn-sm rounded-circle" onClick={setCurrentFile}>
      <FontAwesomeIcon icon={faEye} />
    </button>
  } else {
    icon = <button class="btn btn-outline-light btn-sm rounded-circle" onClick={setCurrentFile}>
      <FontAwesomeIcon icon={faEyeSlash} />
    </button>
  }

  return <div class="d-flex flex-row align-items-center justify-content-between py-1">
    <span> {file.name} </span>
    <div class="d-flex flex-row gap-2">
      {icon}
      <button class="btn btn-outline-danger btn-sm rounded-circle" onClick={onDelete}>
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

  const fileListItems = [...files.map((file, _) => <FileListItem
    currentFile={currentFile == file.name}
    file={file}
    onDelete={removeFromFiles(file.name)}
    setCurrentFile={() => { setCurrentFile(file.name) }}
  />)];

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

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  return <div className="d-flex flex-column justify-content-between align-items-center h-100 p-2 bg-dark text-white" style={{ minWidth: "35ch" }}>
    <div>
      <h2 class="mb-5"> Perplexity </h2>
      <FileList />
    </div>
    <div class="d-flex flex-row gap-2">
      <button class="btn btn-primary">
        <FontAwesomeIcon icon={faUser} />
        &nbsp;
        Sign Up
      </button>
      <button class="btn btn-outlined btn-primary">
        <FontAwesomeIcon icon={faSignIn} />
        &nbsp;
        Login
      </button>
    </div>
  </div>;
}


const App = () => {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  return (
    <div class="vh-100 vw-100 d-flex flex-row">
      <Sidebar />
      <div className="d-flex flex-grow-1 flex-row m-2 h-100">
        <ReactQuill style={{ width: "60%" }} value={text} onChange={handleChange} />
        <div style={{ width: "40%", backgroundColor: "rgb(237, 237, 237)" }} className="px-5">
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
      </div>
    </div>
  );
};

export default App;
