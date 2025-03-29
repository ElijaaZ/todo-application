import React, { useState, useEffect } from "react";
import styles from "../styles/todos.module.css";
import TodoList from "./TodoList.jsx";
import Pagination from "./Pagination.jsx";
import PaginationHook from "../hooks/PaginationHook.jsx";
import useTodoLogic from "../hooks/useTodoLogic";
import CreateModal from "./CreateModal.jsx";

const Todos = ({ passCreateTodo }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    todos,
    expandedTodo,
    toggleTodo,
    deleteTodo,
    createTodo,
    updateTodo,
    error,
  } = useTodoLogic();

  useEffect(() => {
    // skicka createTodo till Home
    if (passCreateTodo) {
      passCreateTodo(createTodo);
    }
  }, [createTodo, passCreateTodo]);

  const { currentItems, totalPages, currentPage, goToPage } =
    PaginationHook(todos);

  return (
    <div className={styles.today_container}>
      {error && <p className={styles.errorText}>{error}</p>}

      {!error && (
        <h2 style={{ color: "white" }}>
          {todos.length === 0 ? "No tasks found" : "Tasks"}
        </h2>
      )}

      {showModal && (
        <CreateModal
          closeModal={() => setShowModal(false)}
          onTodoCreated={createTodo}
        />
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
  );
};

export default Todos;
