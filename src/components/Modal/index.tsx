"use client";
import React, { memo } from "react";
import { ModalProps } from "src/types";

const Modal = memo(function Modal(props: ModalProps) {
  const { title, content, onSuccess, onClose, ref } = props.props;
  return (
    <dialog id="generic_modal" className="modal" ref={ref}>
      <div className="modal-box ">
        <div className="flex justify-end w-full">
          <form
            method="dialog"
            className="w-full inline-flex items-center justify-between"
          >
            <div className="w-2/5">
              <h3 className="font-bold text-lg">{title}</h3>
            </div>
            <button className="btn" onClick={onClose}>
              X
            </button>
          </form>
        </div>
        <p className="py-4">{content}</p>
      </div>
    </dialog>
  );
});

export default Modal;
