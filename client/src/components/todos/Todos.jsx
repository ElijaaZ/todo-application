import React from "react";
import styles from "../../styles/todos.module.css";
import Header from "../layout/Header";
import TodoList from "./TodoList";
import Pagination from "../Pagination";
import useTodoLogic from "../../hooks/useTodoLogic";

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
    <>
      <Header createTodo={createTodo} />
      <div className={styles.todos_container}>
        {error && <p className={styles.errorText}>{error}</p>}

        {!error && (
          <h2 style={{ color: "white" }}>
            {currentItems.length === 0 ? "No tasks found" : ""}
          </h2>
        )}

        <TodoList
          todos={currentItems}
          expandedTodo={expandedTodo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          goToPage={goToPage}
        />
      </div>
    </>
  );
};

export default Todos;
