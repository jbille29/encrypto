// Modal.js
import React from 'react';

function Modal({ isOpen, toggleModal }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={toggleModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <span className="close-button" onClick={toggleModal}>&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  );
}

export default Modal;
