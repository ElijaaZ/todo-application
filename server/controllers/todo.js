const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const todoData = {
      title,
      description,
      date,
    };

    const todo = new Todo(todoData);
    const savedTodo = await todo.save();

    return res.status(201).json(savedTodo);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllTodos = async (_req, res) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json(todos);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, date, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(updatedTodo);
  } catch {
    return res.status(500).json({ message: "Server error" });
  }
};
