import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-70"
      onClick={onClose}
    >
      <dialog
        className="fixed top-1/4 w-80 rounded-lg border-none bg-gray-200 animate-fade-slide-down duration-500 ease-out"
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>
  );
};

export default Modal;
