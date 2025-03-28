import React, { useEffect, useState } from "react";
import styles from "../styles/todos.module.css";
import TodoLogicHook from "../hooks/TodoLogicHook.jsx";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import PaginationHook from "../hooks/PaginationHook.jsx";
import API_BASE_URL from "../api/apiConfig.js";

const Today = () => {
  const { todos, setTodos, expandedTodoId, toggleTodo, deleteTodo } =
    TodoLogicHook();
  const { currentItems, totalPages, currentPage, goToPage } =
    PaginationHook(todos);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodaysTodos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/alltodos`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch todos.");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todo: ", error);
        setError("Failed to fetch tasks for today.");
        setTodos([]);
      }
    };
    fetchTodaysTodos();
  }, [setTodos]);

  return (
    <div className={styles.today_container}>
      {error && <p className={styles.errorText}>{error}</p>}

      {!error && (
        <h2 style={{ color: "white" }}>
          {todos.length === 0 ? "No tasks found" : "Tasks"}
        </h2>
      )}

      <TodoList
        todos={currentItems}
        expandedTodoId={expandedTodoId}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={goToPage}
      />
    </div>
  );
};

export default Today;
