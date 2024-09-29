import React, { useState } from 'react';
import { useHookstate } from '@hookstate/core';

import { faUser } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { faSignIn } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { faSignOut } from '@fortawesome/free-solid-svg-icons'; // Example icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logout } from "./../api/utils";
import { store } from "./../store";
import FileList from './FileList';
import Login from './Login';

export default function Sidebar() {
  let tokenState = useHookstate(store.token);
  let filesState = useHookstate(store.files);
  let currentFileState = useHookstate(store.currentFile);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleLoginModalOpen = () => setShowLoginModal(true);
  const handleLoginModalClose = () => setShowLoginModal(false);

  const loginButton =
    <>
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
    </>;


  const logoutButton = <button class="btn btn-outlined btn-primary" onClick={async () => {
    await logout(tokenState);
    filesState.set([]);
    currentFileState.set(null);
  }}>
    <FontAwesomeIcon icon={faSignOut} />
    &nbsp;
    Logout
  </button>;

  let actionButton = tokenState.get() == null ? loginButton : logoutButton;

  return <div className="d-flex flex-column justify-content-between align-items-center h-100 p-2 bg-dark text-white" style={{ minWidth: "40ch" }}>
    <div>
      <h2 class="mb-5"> Perplexity </h2>
      <FileList />
    </div>
    <div class="d-flex flex-row gap-2">
      {actionButton}
    </div>
    <Login onShow={showLoginModal} onHideClick={handleLoginModalClose} />
  </div>;
}
