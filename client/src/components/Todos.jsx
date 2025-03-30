import React from "react";
import styles from "../styles/todos.module.css";
import TodoList from "./TodoList.jsx";
import Pagination from "./Pagination.jsx";
import useTodoLogic from "../hooks/useTodoLogic";

const Todos = () => {
  const {
    currentItems,
    totalPages,
    currentPage,
    goToPage,
    expandedTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    error,
    createTodo,
  } = useTodoLogic();

  return (
    <div className={styles.today_container}>
      {error && <p className={styles.errorText}>{error}</p>}

      {!error && (
        <h2 style={{ color: "white" }}>
          {currentItems.length === 0 ? "No tasks found" : "Tasks"}
        </h2>
      )}

      <TodoList
        todos={currentItems}
        expandedTodo={expandedTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        createTodo={createTodo} // 👈 lägg till denna
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={goToPage}
      />
    </div>
  );
};

export default Todos;
