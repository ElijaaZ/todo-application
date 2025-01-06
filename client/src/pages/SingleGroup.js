import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import styles from "../styles/groups.module.css";

const SingleGroup = () => {
    const { groupName } = useParams();
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/todos", {
                    credentials: "include",
                });

                const data = await response.json();

                if (groupName === "All") {
                    setTodos(data);
                } else {
                    setTodos(data.filter(todo => todo.group === groupName));
                }
            } catch (error) {
                console.error("Error fetching todos: ", error);
            }
        };
        
        fetchTodos();
    }, [groupName]);



  return (
    <div className={styles.singleGroupContainer}>
      <h1>{groupName} Todos</h1>
      <div className={styles.todoList}>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div key={todo._id} className={styles.todoItem}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
          ))
        ) : (
          <p>No todos found for this group.</p>
        )}
      </div>
    </div>
  );
};

export default SingleGroup
