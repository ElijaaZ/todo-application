const express = require("express");
const router = express.Router();

// Controllers
const {
  createTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo");

router.post("/createtodo", createTodo);
router.get("/alltodos", getAllTodos);
router.delete("/deletetodo/:id", deleteTodo);
router.put("/updatetodo/:id", updateTodo);

module.exports = router;
