const express = require("express");
const router = express.Router();

const {
  createNote,
  getAllNotes,
  deleteNote,
  updateNote,
} = require("../controllers/notes");

router.post("/createnote", createNote);
router.get("/allnotes", getAllNotes);
router.delete("/deletenote/:id", deleteNote);
router.put("/updatednote/:id", updateNote);

module.exports = router;
