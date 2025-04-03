import React from "react";
import styles from "../../styles/modal.module.css";
import TodoForm from "../todos/TodoForm";

const CreateModal = ({ closeModal, onCreate }) => {
  const handleCreate = async (formData) => {
    const success = await onCreate(formData);
    if (success) {
      closeModal();
    }
  };

  return (
    <>
      <div className={styles.modal_overlay} onClick={closeModal}></div>
      <div className={styles.modal}>
        <TodoForm mode="create" onSubmit={handleCreate} onClose={closeModal} />
        <button className={styles.close_btn} onClick={closeModal}>
          X
        </button>
      </div>
    </>
  );
};

export default CreateModal;
