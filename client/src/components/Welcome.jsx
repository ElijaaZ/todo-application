import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";

const Welcome = () => {
  return (
    <div className={styles.welcomeContainer}>
      <h1 className={styles.welcomeTitle}>Welcome to Your Productivity Hub!</h1>
      <p className={styles.welcomeText}>
        Sign In or Register to get started with managing your tasks.
      </p>
      <div className={styles.welcomeButtons}>
        <Link to="/signin" className={styles.welcomeButton}>
          Sign In
        </Link>
        <Link to="/register" className={styles.welcomeButton}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
