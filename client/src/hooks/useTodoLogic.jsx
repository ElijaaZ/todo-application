import { useEffect, useState } from "react";
import API_BASE_URL from "../api/apiConfig";
import PaginationHook from "../hooks/PaginationHook";

const useTodoLogic = () => {
  const [todos, setTodos] = useState([]);
  const [expandedTodo, setExpandedTodo] = useState(null);
  const [error, setError] = useState(null);

  const { currentItems, totalPages, currentPage, goToPage } =
    PaginationHook(todos);

  const toggleTodo = (id) => {
    setExpandedTodo((prev) => (prev === id ? null : id));
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/alltodos`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch todos");

      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos: ", error);
      setError("Failed to fetch tasks for today.");
      setTodos([]);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deletetodo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");
      console.log("hej");

      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const createTodo = async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/createtodo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setTodos((prev) => [...prev, data]);
        return true;
      } else {
        console.error("Create failed:", data);
        return false;
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      return false;
    }
  };

  const updateTodo = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/updatetodo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (response.ok) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, ...updatedData } : todo
          )
        );
      } else {
        console.error("Update failed:", data);
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    currentItems,
    totalPages,
    currentPage,
    goToPage,
    expandedTodo,
    toggleTodo,
    deleteTodo,
    createTodo,
    updateTodo,
    error,
  };
};

export default useTodoLogic;
