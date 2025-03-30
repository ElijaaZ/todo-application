import React, { useState, useEffect } from "react";
import NotesCard from "./NotesCard";
import styles from "../../styles/notes.module.css";
import API_BASE_URL from "../../api/apiConfig";
import NoteModal from "./NoteModal";

const Notes = () => {
  const [notes, setNotes] = useState([
    { _id: "1", content: "First note" },
    { _id: "2", content: "Another note" },
  ]);

  const handleCreateNote = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/createnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotes((prev) => [...prev, data]);
      } else {
        console.error("Create note failed: ", data);
      }
    } catch (error) {
      console.error("Error creating note: ", error);
    }
  };

  useEffect(() => {
    const handleNote = () => {
      handleCreateNote();
    };

    window.addEventListener("create-note", handleNote);
    return () => window.removeEventListener("create-note", handleNote);
  }, []);

  const handleUpdateNote = (id, newContent) => {
    setNotes((prev) =>
      prev.map((note) =>
        note._id === id ? { ...note, content: newContent } : note
      )
    );
  };

  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  return (
    <div className={styles.notesContainer}>
      <NoteModal />
      <div className={styles.notesGrid}>
        {notes.map((note) => (
          <NotesCard
            key={note._id}
            note={note}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
