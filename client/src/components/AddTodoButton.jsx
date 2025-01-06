import React from 'react';
import styles from "../styles/todoButton.module.css";
import { Link, useLocation } from 'react-router-dom';

const AddTodoButton = () => {
    const location = useLocation();

    if (location.pathname === "/createtodos") {
        return null;
    }


  return (
    <Link to="/createtodos"className={styles.todoButton}>
      +
    </Link>
  )
}

export default AddTodoButton
