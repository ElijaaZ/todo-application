import React, { useEffect, useState } from "react";
import styles from "../../styles/notes.module.css";
import API_BASE_URL from "../../api/apiConfig";
import style from "../../styles/modal.module.css";

const NoteModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const openModal = () => setIsOpen(true);
    window.addEventListener("create-note", openModal);
    return () => window.removeEventListener("create-note", openModal);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/createnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setFormData({ title: "", description: "" });
        setIsOpen(false);
        window.dispatchEvent(new CustomEvent("note-created", { detail: data }));
      } else {
        console.error("Create note failed: ", data);
      }
    } catch (error) {
      console.error("Error creating note: ", error);
    }
  };
  if (!isOpen) return null;

  return (
    <>
      <div className={style.modal_overlay} onClick={() => setIsOpen(false)} />
      <div className={style.modal}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Note
        </h2>
        <form onSubmit={handleSubmit} className={styles.noteForm}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles.note_button}>
            Create
          </button>
        </form>
        <button className={style.close_btn} onClick={() => setIsOpen(false)}>
          X
        </button>
      </div>
    </>
  );
};

export default NoteModal;
