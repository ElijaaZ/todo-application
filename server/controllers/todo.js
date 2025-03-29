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

    if (req.user && req.user.userId) {
      todoData.user = req.user.userId;
    }

    const todo = new Todo(todoData);
    const savedTodo = await todo.save();

    return res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json(todos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Hitta todon
    const deletedTodo = await Todo.findByIdAndDelete(id);

    // Kolla om todon finns
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getSingleTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;

    const todo = await Todo.findById(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.status(200).json(todo);
  } catch (error) {
    console.error("Error fetching todo: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};
