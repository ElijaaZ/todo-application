const Note = require("../models/Notes");

exports.createNote = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const noteData = {
      title,
      description,
    };

    const note = new Note(noteData);
    const savedNote = await note.save();

    return res.status(201).json(savedNote);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllNotes = async (_req, res) => {
  try {
    const notes = await Note.find();

    return res.status(200).json(notes);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    if (updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json(updatedNote);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.status(200).json({ message: "Note deleted successfully" });
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};
