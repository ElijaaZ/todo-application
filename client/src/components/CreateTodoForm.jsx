import React, { useState } from "react";
import styles from "../styles/todos.module.css";
import DatePicker from "react-datepicker"; // Importera DatePicker
import "react-datepicker/dist/react-datepicker.css";
import API_BASE_URL from "../api/apiConfig";

export default function CreateTodoComp() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("Create Todo");

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
      const response = await fetch(`${API_BASE_URL}/createtodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage("Todo created");
        setErrors({});
        setTimeout(() => {
          setMessage("Create Todo");
          window.location.reload();
        }, 1500);
      } else {
        if (data.errors) {
          const fieldErrors = {};
          data.errors.forEach((error) => {
            fieldErrors[error.path] = error.msg;
          });
          setErrors(fieldErrors);
        } else {
          setErrors({
            general: "An error occured.",
          });
        }
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occured." });
    }
  };

  return (
    <div className={styles.createTodoContainer}>
      <h2 style={{ color: "black" }}>Create Todo</h2>
      <div className={styles.todoForm}>
        <form onSubmit={handleSubmit}>
          <div className={styles.todoFormGroup}>
            {errors.title && <p className={styles.errorText}>{errors.title}</p>}
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
              required
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
              portalId="root-portal"
            />
          </div>

          <button type="submit" className={styles.createTodoBtn}>
            {message}
          </button>
        </form>
      </div>
    </div>
  );
}
