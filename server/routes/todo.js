const express = require('express');
const router = express.Router();


// Middleware
const { verifyToken } = require("../middlewares/index");

// Controllers
const {
    createTodo,
    getTodos,
    getAllTodos,
    deleteTodo,
    updateTodo,
    getSingleTodo,
    getTodaysTodos
} = require("../controllers/todo");

router.post("/createtodo", verifyToken, createTodo);
router.get("/todos", verifyToken, getTodos);
router.get("/alltodos", getAllTodos);
router.get("/todaystodos", verifyToken, getTodaysTodos);
router.delete("/deletetodo/:id", verifyToken, deleteTodo)
router.put("/updatetodo/:id", verifyToken, updateTodo);
router.get("/getsingletodo/:todoId", verifyToken, getSingleTodo);

module.exports = router;