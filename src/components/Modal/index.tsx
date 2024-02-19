"use client";
import { ModalProps } from "src/types";
import { XIcon } from "../Icons";

export default function Modal(props: ModalProps) {
  const { title, children, onClose, modalRef } = props;
  return (
    <dialog id="generic_modal" className={"modal"} ref={modalRef}>
      <div className="modal-box">
        <div className="flex justify-end w-full">
          <form
            method="dialog"
            className="w-full inline-flex items-center justify-between"
          >
            <div className="flex flex-auto">
              <h3 className="font-black text-lg">{title}</h3>
            </div>
            <button className="btn btn-ghost" onClick={onClose}>
              <XIcon />
            </button>
          </form>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </dialog>
  );
}
