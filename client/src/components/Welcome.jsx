import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/home.module.css";
import Lottie from "lottie-react";
import Animation from "../assets/Animation.json"

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
      <div style={{ width: "400px", margin: "0 auto" }}>
        <Lottie animationData={Animation} loop={true} />
      </div>
    </div>
  );
};

export default Welcome;
