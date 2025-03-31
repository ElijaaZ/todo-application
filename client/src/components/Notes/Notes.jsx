import React, { useState, useEffect } from "react";
import NotesCard from "./NotesCard";
import styles from "../../styles/notes.module.css";
import NoteModal from "./NoteModal";
import useNoteLogic from "../../hooks/useNoteLogic";

const Notes = () => {
  const { notes, createNote, updateNote, deleteNote } = useNoteLogic();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const openModal = () => setShowModal(true);
    window.addEventListener("create-note", openModal);
    return () => window.removeEventListener("create-note", openModal);
  }, []);

  return (
    <div className={styles.notesContainer}>
      {showModal && (
        <NoteModal onClose={() => setShowModal(false)} onCreate={createNote} />
      )}
      <div className={styles.notesGrid}>
        {notes.map((note) => (
          <NotesCard
            key={note._id}
            note={note}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
