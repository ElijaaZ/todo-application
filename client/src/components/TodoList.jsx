import React, { useState, useEffect } from "react";
import styles from "../styles/todos.module.css";
import { FaTrash } from "react-icons/fa";
import UpdateModal from "./Modals/UpdateModal";
import ViewModal from "./Modals/ViewModal";
import CreateModal from "./Modals/CreateModal";

const TodoList = ({
  todos,
  expandedTodo,
  deleteTodo,
  updateTodo,
  createTodo,
}) => {
  const [checkedItems, setCheckedItems] = useState(() => {
    const stored = localStorage.getItem("checkedTodos");
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem("checkedTodos", JSON.stringify(checkedItems));
  }, [checkedItems]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewTodo, setViewTodo] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const handleOpen = () => setShowCreateModal(true);
    window.addEventListener("create-todo", handleOpen);
    return () => window.removeEventListener("create-todo", handleOpen);
  }, []);

  const handleEditClick = (todo) => {
    setSelectedTodo(todo);
    setShowEditModal(true);
  };

  return (
    <>
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
                onClick={() => {
                  setViewTodo(todo);
                  setShowViewModal(true);
                }}
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

      {showViewModal && viewTodo && (
        <ViewModal
          todo={viewTodo}
          closeModal={() => setShowViewModal(false)}
          onEdit={() => {
            setSelectedTodo(viewTodo);
            setShowEditModal(true);
            setShowViewModal(false);
          }}
        />
      )}

      {showEditModal && selectedTodo && (
        <UpdateModal
          todo={selectedTodo}
          closeModal={() => setShowEditModal(false)}
          onTodoUpdated={(id, updatedData) => {
            updateTodo(id, updatedData);
            setShowEditModal(false);
          }}
        />
      )}
      {showCreateModal && (
        <CreateModal
          closeModal={() => setShowCreateModal(false)}
          createTodo={createTodo}
        />
      )}
    </>
  );
};

export default TodoList;
