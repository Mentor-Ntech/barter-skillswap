// src/components/ui/Modal.jsx
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black opacity-50" 
        onClick={onClose} 
      ></div>
      {/* Modal content */}
      <div className="relative bg-white rounded-lg p-6 shadow-lg z-10">
        {children}
      </div>
    </div>
  );
};

export default Modal;
