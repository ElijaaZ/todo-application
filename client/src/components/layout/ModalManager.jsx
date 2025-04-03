import React from "react";
import { useModal } from "../context/ModalContext";
import CreateModal from "../Modals/CreateModal";
import NoteModal from "../Notes/NoteModal";
import ViewModal from "../Modals/ViewModal";
import UpdateModal from "../Modals/UpdateModal";

const ModalManager = () => {
  const { activeModal, closeModal, modalData } = useModal();

  if (!activeModal) return null;

  switch (activeModal) {
    case "create-todo":
      return (
        <CreateModal closeModal={closeModal} onCreate={modalData?.onCreate} />
      );
    case "edit-todo":
      return (
        <UpdateModal
          closeModal={closeModal}
          todo={modalData}
          onTodoUpdated={modalData?.onTodoUpdated}
        />
      );
    case "view-todo":
      return (
        <ViewModal
          todo={modalData}
          closeModal={closeModal}
          onEdit={modalData?.onEdit}
        />
      );
    case "create-note":
      return <NoteModal onClose={closeModal} onCreate={modalData?.onCreate} />;
    default:
      return null;
  }
};

export default ModalManager;
