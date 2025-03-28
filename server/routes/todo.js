const express = require("express");
const router = express.Router();

// Controllers
const {
  createTodo,
  getTodos,
  getAllTodos,
  deleteTodo,
  updateTodo,
  getSingleTodo,
  getTodaysTodos,
} = require("../controllers/todo");

router.post("/createtodo", createTodo);
router.get("/todos", getTodos);
router.get("/alltodos", getAllTodos);
router.get("/todaystodos", getTodaysTodos);
router.delete("/deletetodo/:id", deleteTodo);
router.put("/updatetodo/:id", updateTodo);
router.get("/getsingletodo/:todoId", getSingleTodo);

module.exports = router;
