import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaTasks } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/tasks" className={styles.nav_item}>
      <div className={styles.nav_content}>
        <FaTasks className={styles.nav_icon} />
        <span>Tasks</span>
        </div>
      </Link>
      <Link to="/calendar" className={styles.nav_item}>
      <div className={styles.nav_content}>
        <FaCalendarAlt className={styles.nav_icon} />
        <span>Calendar</span>
        </div>
      </Link>
      <Link to="/profile" className={styles.nav_item}>
      <div className={styles.nav_content}>
        <RxAvatar className={styles.nav_icon} />
        <span>Profile</span>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
