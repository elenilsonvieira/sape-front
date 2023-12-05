import React, { useRef, useEffect } from "react";
import "./Modal.css";

const Modal = (props) => {
  const modalOverlayRef = useRef(null);

  useEffect(() => {
    // Adiciona um event listener para fechar o modal ao clicar fora dele
    const handleOutsideClick = (event) => {
      if (modalOverlayRef.current && !modalOverlayRef.current.contains(event.target)) {
        props.onClose();
      }
    };

    // Adiciona o event listener quando o componente é montado
    document.addEventListener("mousedown", handleOutsideClick);

    // Remove o event listener quando o componente é desmontado
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [props]);

  return (
    <div className="modal-overlay" ref={modalOverlayRef}>
      <div className="modal-content">
        <span className="close-button" onClick={props.onClose}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;

