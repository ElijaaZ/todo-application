import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from "../styles/todos.module.css";

const SingleTodo = () => {
    const { todoId } = useParams();
    const [todo, setTodo] = useState(null);
    
    useEffect(() => {
        const fetchTodo = async () => {
            try { 
                const response = await fetch(`http://localhost:5000/api/getsingletodo/${todoId}`, {
                    method: "GET",
                    credentials: "include",
                });


                if (!response.ok) {
                    throw new Error("Failed to fetch todo");
                }

                const data = await response.json();
                setTodo(data);
            } catch (error) {
                console.error("Error fetching todo:", error);
            }
        };

        fetchTodo();
    }, [todoId]);

    if (!todo) {
        return <p>Todo not found</p>
    }

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
    </div>
  )
}

export default SingleTodo
