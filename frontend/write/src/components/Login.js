import React, {useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Modal components

export default function Login({ onShow, onHideClick}) {
    return <Modal show={onShow} onHide={onHideClick}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHideClick}>
            Close
          </Button>
          <Button variant="primary" onClick={onHideClick}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
}
