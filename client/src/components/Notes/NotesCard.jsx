import React, { useState } from "react";
import styles from "../../styles/notes.module.css";

const NotesCard = ({ note, onUpdate, onDelete }) => {
  const [content, setContent] = useState(note.content);

  const handleBlur = () => {
    onUpdate(note._id, content);
  };

  return (
    <div className={styles.noteCard}>
      <textarea
        className={styles.noteTextarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        placeholder="Write your note..."
      />
      <button className={styles.deleteBtn} onClick={() => onDelete(note._id)}>
        ✕
      </button>
    </div>
  );
};

export default NotesCard;
