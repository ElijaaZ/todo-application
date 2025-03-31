import { useState, useEffect } from "react";
import API_BASE_URL from "../api/apiConfig";

const useNoteLogic = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/allnotes`);
      const data = await response.json();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const createNote = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/createnote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setNotes((prev) => [...prev, data]);
        return true;
      } else {
        console.error("Create note failed", data);
        return false;
      }
    } catch (err) {
      console.error("Create note error:", err);
      return false;
    }
  };

  const updateNote = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updatednote/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();

      if (response.ok) {
        setNotes((prev) =>
          prev.map((note) =>
            note._id === id ? { ...note, ...updatedData } : note
          )
        );
      } else {
        console.error("Update failed", data);
      }
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deletenote/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
      } else {
        const data = await response.json();
        console.error("Delete failed", data);
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    setNotes,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
  };
};

export default useNoteLogic;
