const express = require("express");
const router = express.Router();

// Controllers
const {
  createTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
  getSingleTodo,
} = require("../controllers/todo");

router.post("/createtodo", createTodo);
router.get("/alltodos", getAllTodos);
router.delete("/deletetodo/:id", deleteTodo);
router.put("/updatetodo/:id", updateTodo);
router.get("/getsingletodo/:id", getSingleTodo);

module.exports = router;
