import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteModal = ({ show, handleClose, handleOK }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Some heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure to delete this problem?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleOK}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
