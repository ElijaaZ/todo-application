import React, {useState, useEffect } from "react";
import styles from "../styles/todos.module.css"
import { useNavigate } from "react-router-dom";

export default function SavedTodosComp() {

  const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/todos", {
                    method: "GET",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch todos");
                }
                const data = await response.json();
                setTodos(data);
                setLoading(false);
            } catch (error){
                console.error("ERROR fetching todos: ", error);
                setLoading(false);
            }
        };
        fetchTodos()
    }, []);

    const handleCheckboxChange = async (todoId) => {
       try {

        const response = await fetch(`http://localhost:5000/api/deletetodo/${todoId}`, { 
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to update todo");
        }

        setTodos(todos.filter(todo => todo._id !== todoId));
       } catch (error) {
        console.error("Error updating todo: ", error);
       }
    };

    const handleLabelClick = (todoId, e) => {
      if (e.target.tagName !== "INPUT") {
        navigate(`/savedtodos/${todoId}`);
      }
    };

      return (
        <div className={styles.savedTodosContainer}>
          <h1>Your Saved Todos</h1>
      
          {loading ? (
            <p>Loading todos...</p> /* Laddningsmeddelande */
          ) : todos.length === 0 ? (
            <p>No todos saved yet.</p> /* Om det inte finns några to-dos */
          ) : (
            <ul className={styles.savedTodosList}>
              {todos.map((todo) => (
                <li key={todo._id}>
                  <label className={styles.listLabel} onClick={(e) => handleLabelClick(todo._id, e)}>
                    <input
                      className={styles.listInput}
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCheckboxChange(todo._id)}
                    />
                    <span className={styles.text_content}>{todo.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
}