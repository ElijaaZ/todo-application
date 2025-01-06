import React, { useState } from "react";
import styles from "../styles/todos.module.css";
import DatePicker from "react-datepicker"; // Importera DatePicker
import "react-datepicker/dist/react-datepicker.css";
import API_BASE_URL from "../api/apiConfig";

const groups = [
  "General",
  "Family",
  "Sports",
  "Study",
  "Work",
  "Shopping",
  "Finance",
];

export default function CreateTodoComp() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    group: "General",
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

  const handleGroupChange = (selectedGroup) => {
    setFormData({
      ...formData,
      group: selectedGroup,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/createtodo`, {
        method: "POST",
        credentials: "include",
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
          window.location.reload()
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
            <label>Todo Group:</label>
            <div className={styles.groupSelection}>
              {groups.map((group) => (
                <button
                  type="button"
                  key={group}
                  className={`${styles.groupButton} ${
                    formData.group === group ? styles.activeGroup : ""
                  }`}
                  onClick={() => handleGroupChange(group)}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.todoFormGroup}>
            <label>Date:</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              portalId="root-portal"
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

          <button type="submit" className={styles.createTodoBtn}>
            {message}
          </button>
        </form>
      </div>
    </div>
  );
}
