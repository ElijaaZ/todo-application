import React from "react";
import styles from "../styles/todos.module.css";
import TodoForm from "./TodoForm";

const CreateModal = ({ closeModal, onTodoCreated }) => {
  return (
    <>
      <div className={styles.modal_overlay} onClick={closeModal} />
      <div className={styles.modal}>
        <TodoForm mode="create" onSubmit={onTodoCreated} onClose={closeModal} />
        <button className={styles.close_btn} onClick={closeModal}>
          X
        </button>
      </div>
    </>
  );
};

export default CreateModal;
