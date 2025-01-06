import { useState } from 'react'
import API_BASE_URL from '../api/apiConfig';

const TodoLogicHook = (initialTodos = []) => {
    const [todos, setTodos] = useState(initialTodos);
    const [expandedTodoId, setExpandedTodoId] = useState(null);

    const toggleTodo = (id) => {
        setExpandedTodoId(expandedTodoId === id ? null : id);
      };

      const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/deletetodo${id}`, {
                method: "DELETE",
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error("Failed to delete todo")
            }
    
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
      };


  return { todos, setTodos, expandedTodoId, toggleTodo, deleteTodo };
};

export default TodoLogicHook
