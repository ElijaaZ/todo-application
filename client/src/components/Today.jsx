import React, { useEffect, useState } from "react";
import styles from "../styles/todos.module.css";
import TodoLogicHook from "../hooks/TodoLogicHook.jsx";
import TodoList from "./TodoList";
import Pagination from "./Pagination";
import PaginationHook from "../hooks/PaginationHook.jsx";

const Today = () => {
  const { todos, setTodos, expandedTodoId, toggleTodo, deleteTodo } =
    TodoLogicHook();
  const { currentItems, totalPages, currentPage, goToPage } =
    PaginationHook(todos);
  const [error, setError] = useState(null);

  const date = new Date();
  const fullDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchTodaysTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todaystodos", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch todays todos.");
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
          {todos.length === 0
            ? `No tasks for ${fullDate}`
            : `Tasks for ${fullDate}`}
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
