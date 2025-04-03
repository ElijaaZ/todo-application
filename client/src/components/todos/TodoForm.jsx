// src/components/TodoForm.jsx
import React, { useState, useEffect } from "react";
import styles from "../../styles/todos.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodoForm = ({ mode = "create", onSubmit, onClose, initialData = {} }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(
    mode === "edit" ? "Update Todo" : "Create Todo"
  );

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        date: initialData.date ? new Date(initialData.date) : new Date(),
      });
    }
  }, [mode, initialData]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await onSubmit(formData);
      if (success !== false) {
        setMessage(mode === "edit" ? "Todo updated" : "Todo created");
        setErrors({});
        setMessage(mode === "edit" ? "Update Todo" : "Create Todo");
        onClose();
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred." });
    }
  };

  return (
    <div className={styles.createTodoContainer}>
      <h2 style={{ color: "black", marginBottom: "20px" }}>
        {mode === "edit" ? "Update Todo" : "Create Todo"}
      </h2>
      <form className={styles.todoForm} onSubmit={handleSubmit}>
        <div className={styles.todoFormGroup}>
          {errors.title && <p className={styles.errorText}>{errors.title}</p>}
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className={styles.todoInput}
          />
        </div>

        <div className={styles.todoFormGroup}>
          {errors.description && (
            <p className={styles.errorText}>{errors.description}</p>
          )}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.todoFormGroup}>
          <label>Date:</label>
          <DatePicker
            className={styles.datepicker}
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <button type="submit" className={styles.createTodoBtn}>
          {message}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
