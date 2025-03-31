import React, { useState } from "react";
import styles from "../../styles/notes.module.css";
import style from "../../styles/modal.module.css";

const NoteModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onCreate(formData);
    if (success) {
      setFormData({ title: "", description: "" });
      onClose();
    }
  };

  return (
    <>
      <div className={style.modal_overlay} onClick={onClose} />
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
        <button className={style.close_btn} onClick={onClose}>
          X
        </button>
      </div>
    </>
  );
};

export default NoteModal;
