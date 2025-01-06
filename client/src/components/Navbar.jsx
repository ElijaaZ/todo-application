import React from "react";
import { Link } from "react-router-dom";
import { FaTasks, FaHome } from "react-icons/fa";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.nav_item}>
      <div className={styles.nav_content}>
        <FaHome className={styles.nav_icon} />
        <span>Home</span>
        </div>
      </Link>
      <Link to="/tasks" className={styles.nav_item}>
      <div className={styles.nav_content}>
        <FaTasks className={styles.nav_icon} />
        <span>Tasks</span>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
