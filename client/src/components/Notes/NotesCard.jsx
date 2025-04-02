import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/notes.module.css";
import { FaTrashCan } from "react-icons/fa6";

const NotesCard = ({ note, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(note.title || "");
  const [description, setDescription] = useState(note.description || "");
  const textareaRef = useRef(null);

  useEffect(() => {
    setDescription(note.description || "");
    setTitle(note.title || "");
  }, [note]);

  useEffect(() => {
    autoResize();
  }, [description]);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  const handleBlur = () => {
    onUpdate(note._id, { title, description });
  };

  return (
    <div className={styles.noteCard}>
      <div className={styles.noteHeader}>
        <input
          className={styles.noteTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          placeholder="Title"
        />
        <FaTrashCan
          style={{ cursor: "pointer", fontSize: "22px" }}
          onClick={() => onDelete(note._id)}
        />
      </div>

      <textarea
        ref={textareaRef}
        className={styles.noteTextarea}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          autoResize();
        }}
        onBlur={handleBlur}
        placeholder="Write your note..."
        rows={1}
      />
    </div>
  );
};

export default NotesCard;
