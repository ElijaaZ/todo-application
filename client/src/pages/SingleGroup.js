import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/todos.module.css";
import TodoLogicHook from "../hooks/TodoLogicHook.jsx";
import PaginationHook from "../hooks/PaginationHook.jsx";
import TodoList from "../components/TodoList";
import Pagination from "../components/Pagination";


const SingleGroup = () => {
  const { groupName } = useParams();
  const { todos, setTodos, expandedTodoId, toggleTodo, deleteTodo } =
    TodoLogicHook();
  const { currentItems, totalPages, currentPage, goToPage } = PaginationHook(
    todos
  );

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/todos", {
          credentials: "include",
        });

        const data = await response.json();

        if (groupName === "All") {
          setTodos(data);
        } else {
          setTodos(data.filter((todo) => todo.group === groupName));
        }
      } catch (error) {
        console.error("Error fetching todos: ", error);
      }
    };

    fetchTodos();
  }, [groupName, setTodos]);

  return (
    <div className={styles.singleGroupContainer}>
      <h1 style={{color: "white"}}>{groupName} Todos</h1>

      <TodoList
        todos={currentItems} // Bara todos på den aktuella sidan visas
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

export default SingleGroup;
