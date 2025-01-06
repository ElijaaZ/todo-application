import React from "react";
import styles from "../styles/todos.module.css";

const Pagination = ({ totalPages, currentPage, goToPage }) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index + 1)}
          className={`${styles.paginationButton} ${
            currentPage === index + 1 ? styles.activePage : ""
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
