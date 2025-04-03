import React, { useState, useEffect } from "react";
import styles from "../../styles/todos.module.css";
import { FaTrash } from "react-icons/fa";
import { useModal } from "../context/ModalContext";

const TodoList = ({ todos, expandedTodo, deleteTodo, updateTodo }) => {
  const [checkedItems, setCheckedItems] = useState(() => {
    const stored = localStorage.getItem("checkedTodos");
    return stored ? JSON.parse(stored) : {};
  });

  const { openModal } = useModal();

  useEffect(() => {
    localStorage.setItem("checkedTodos", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleEditClick = (todo) => {
    openModal("edit-todo", {
      ...todo,
      onTodoUpdated: updateTodo,
    });
  };

  const handleViewClick = (todo) => {
    openModal("view-todo", {
      ...todo,
      onEdit: () =>
        openModal("edit-todo", {
          ...todo,
          onTodoUpdated: updateTodo,
        }),
    });
  };

  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => (
        <li key={todo._id} className={styles.todoItem}>
          <div className={styles.todoBox}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={!!checkedItems[todo._id]}
              onChange={() =>
                setCheckedItems((prev) => ({
                  ...prev,
                  [todo._id]: !prev[todo._id],
                }))
              }
            />
            <div
              className={styles.todoContent}
              onClick={() => handleViewClick(todo)}
            >
              <strong>{todo.title}</strong>
            </div>
            <div className={styles.todo_info}>
              <button
                className={styles.edit_button}
                onClick={() => handleEditClick(todo)}
              >
                EDIT
              </button>
              <FaTrash
                style={{ fontSize: "22px", color: "#ff6500" }}
                onClick={() => deleteTodo(todo._id)}
              />
            </div>
          </div>

          {expandedTodo === todo._id && (
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
