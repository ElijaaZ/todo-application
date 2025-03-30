import React from "react";
import styles from "../styles/todoButton.module.css";

const CreateButton = ({ onClick }) => {
  return (
    <button className={styles.todoButton} onClick={onClick}>
      +
    </button>
  );
};

export default CreateButton;
