import React from 'react';
import { Link } from "react-router-dom";
import styles from "../styles/tasks.module.css";
import { FaTasks, FaUsers, FaBook, FaBriefcase, FaFootballBall, FaShoppingCart, FaMoneyBillWave, FaLayerGroup } from "react-icons/fa";

const groups = [
  { name: "General", Icon: FaTasks }, 
  { name: "Family", Icon: FaUsers },
  { name: "Study", Icon: FaBook },
  { name: "Work", Icon: FaBriefcase },
  { name: "Sports", Icon: FaFootballBall },
  { name: "Shopping", Icon: FaShoppingCart },
  { name: "Finance", Icon: FaMoneyBillWave },
  { name: "All", Icon: FaLayerGroup }
];

const Tasks = () => {

  return (
    <div className={styles.task_container}>

      <div className={styles.grid_container}>
        {groups.map((group) => (

          <Link 
          key={group.name}
          to={`/tasks/${group.name}`}
          className={styles.groupLink}
          >
            <div className={styles.taskBox}>
              <div className={styles.iconCircle}>
                <group.Icon className={styles.icon} />
              </div>
              <h4>{group.name}</h4>
            </div>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default Tasks
