import React, { useState } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { faSignIn } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FileList from './FileList';
import Login from './Login';

export default function Sidebar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleLoginModalOpen = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);


  return <div className="d-flex flex-column justify-content-between align-items-center h-100 p-2 bg-dark text-white" style={{ minWidth: "40ch" }}>
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
      <button class="btn btn-outlined btn-primary" onClick={handleLoginModalOpen}>
        <FontAwesomeIcon icon={faSignIn} />
        &nbsp;
        Login
      </button>
    </div>
    <Login onShow={showLoginModal} onHideClick={handleLoginModalClose} />
  </div>;
}
