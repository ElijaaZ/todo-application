import React from "react";
import Header from "../layout/Header";
import NotesCard from "./NotesCard";
import styles from "../../styles/notes.module.css";
import useNoteLogic from "../../hooks/useNoteLogic";

const Notes = () => {
  const { notes, createNote, updateNote, deleteNote } = useNoteLogic();

  return (
    <>
      <Header createNote={createNote} />
      <div className={styles.notesContainer}>
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
    </>
  );
};

export default Notes;
