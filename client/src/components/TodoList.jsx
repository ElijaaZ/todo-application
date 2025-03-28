import React from "react";
import styles from "../styles/todos.module.css";

const TodoList = ({ todos, expandedTodoId, toggleTodo, deleteTodo }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <li
          key={todo._id}
          className={`${styles.todoItem} ${
            expandedTodoId === todo._id ? styles.expanded : ""
          }`}
        >
          <div className={styles.todoBox}>
            <input
              type="checkbox"
              onChange={() => deleteTodo(todo._id)}
              className={styles.checkbox}
            />
            <div
              className={styles.todoContent}
              onClick={() => toggleTodo(todo._id)}
            >
              <strong>{todo.title}</strong>
            </div>
            <span className={styles.toggleIcon}>
              {expandedTodoId === todo._id ? "▲" : "▼"}
            </span>
          </div>

          {expandedTodoId === todo._id && (
            <div className={styles.todoDetails}>
              <p>
                <strong>Description:</strong> {todo.description}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(todo.date).toLocaleDateString()}
              </p>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
