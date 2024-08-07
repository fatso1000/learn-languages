"use client";
import { Link, useRouter } from "src/shared/navigation";
import { useEffect, useRef } from "react";
import Modal from "src/components/Modal";

export default function LifesModal({
  isLifesOver,
  sectionId,
  isLevel,
}: {
  isLifesOver: boolean;
  sectionId: number;
  isLevel: boolean;
}) {
  const router = useRouter();
  const modalRef = useRef<HTMLDialogElement>(null);

  const onClose = () => isLevel && router.push("/section?id=" + sectionId);

  useEffect(() => {
    if (isLifesOver) modalRef.current && modalRef.current.showModal();
  }, [isLifesOver]);

  return (
    <Modal modalRef={modalRef} id="livesModal" title="" onClose={onClose}>
      <>
        <div className="flex flex-col justify-between items-center w-full mt-auto gap-10">
          <div>
            <h1 className="font-extrabold text-3xl text-center">
              Necesitas vidas para continuar con tus lecciones!
            </h1>
            <p className="text-center text-lg">
              Siguiente vida en{" "}
              <span className="text-error font-bold">2 horas</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full mt-auto p-10">
          <div className="w-full flex justify-center">
            <button
              className="btn btn-success"
              // onClick={() => activateInfiniteLifes()}
            >
              Activar vidas infinitas
            </button>
          </div>
          <div className="w-full flex justify-center">
            {isLevel ? (
              <Link
                href={"/section?id=" + sectionId}
                type="button"
                className="btn btn-ghost"
              >
                No, gracias
              </Link>
            ) : (
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => modalRef.current?.close()}
              >
                No, gracias
              </button>
            )}
          </div>
        </div>
      </>
    </Modal>
  );
}
