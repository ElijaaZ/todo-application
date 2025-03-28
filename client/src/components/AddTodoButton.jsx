import React from "react";
import styles from "../styles/todoButton.module.css";

const AddTodoButton = ({ onClick }) => {
  return (
    <button className={styles.todoButton} onClick={onClick}>
      +
    </button>
  );
};

export default AddTodoButton;
