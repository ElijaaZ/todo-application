import React from "react";
import styles from "../styles/todos.module.css";
import CreateTodoForm from "./CreateTodoForm";

const TodoModal = ({ closeModal }) => {
  return (
    <>
      <div className={styles.modal_overlay} onClick={closeModal}></div>

      <div className={styles.modal}>
        <CreateTodoForm closeModal={closeModal} />
        <button className={styles.close_btn} onClick={closeModal}>
          X
        </button>
      </div>
    </>
  );
};

export default TodoModal;
