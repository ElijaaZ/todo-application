import React from "react";
import styles from "../../styles/todos.module.css";
import TodoForm from "../TodoForm";

const UpdateModal = ({ closeModal, todo, onTodoUpdated }) => {
  return (
    <>
      <div className={styles.modal_overlay} onClick={closeModal}></div>
      <div className={styles.modal}>
        <TodoForm
          mode="edit"
          initialData={todo}
          onSubmit={(updatedData) => onTodoUpdated(todo._id, updatedData)}
          onClose={closeModal}
        />
        <button className={styles.close_btn} onClick={closeModal}>
          X
        </button>
      </div>
    </>
  );
};

export default UpdateModal;
