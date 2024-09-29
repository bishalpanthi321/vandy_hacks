import React, { useState } from 'react';
import { useHookstate } from '@hookstate/core';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Modal components
import { login } from "./../api/utils";
import { store } from "./../store";

export default function Login({ onShow, onHideClick }) {
  let tokenState = useHookstate(store.token);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    let response = await login(email, password);
    let json = await response.json();
    localStorage.setItem("token", JSON.stringify(json));
    tokenState.set(json);
    onHideClick();
  };

  return <Modal show={onShow} onHide={onHideClick}>
    <Modal.Header closeButton>
      <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHideClick}>
        Close
      </Button>
      <Button variant="primary" onClick={handleLogin}>
        Login
      </Button>
    </Modal.Footer>
  </Modal>
}
