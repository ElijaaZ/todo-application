import React from "react";
import styles from "../../styles/modal.module.css";
import style from "../../styles/todos.module.css";

const ViewModal = ({ todo, closeModal, onEdit }) => {
  return (
    <>
      <div className={styles.modal_overlay} onClick={closeModal}></div>
      <div className={styles.modal}>
        <h2 style={{ color: "black", fontSize: "40px" }}>{todo.title}</h2>
        <p>
          <strong>Description:</strong> {todo.description}
        </p>
        <p>
          <strong>Date:</strong> {new Date(todo.date).toLocaleDateString()}
        </p>
        <div style={{ marginTop: "1rem", display: "flex", gap: "10px" }}>
          <button className={style.edit_button} onClick={onEdit}>
            EDIT
          </button>
          <button className={styles.close_btn} onClick={closeModal}>
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewModal;
