import { useState } from 'react'

const TodoLogicHook = (initialTodos = []) => {
    const [todos, setTodos] = useState(initialTodos);
    const [expandedTodoId, setExpandedTodoId] = useState(null);

    const toggleTodo = (id) => {
        setExpandedTodoId(expandedTodoId === id ? null : id);
      };

      const deleteTodo = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/deletetodo/${id}`, {
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
