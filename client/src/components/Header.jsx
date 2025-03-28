import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/header.module.css";
import { FaHome, FaTasks, FaRegStickyNote } from "react-icons/fa";
import AddTodoButton from "./AddTodoButton";
import TodoModal from "./TodoModal";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();

  const date = new Date();
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const isActive = (path) => location.pathname === path;

  const getTitle = (path) => {
    switch (path) {
      case "/":
        return "Home";
      case "/tasks":
        return "Tasks";
      case "/notes":
        return "Notes";
      case "/calendar":
        return "Calendar";
      default:
        return "";
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h1 className={styles.pageTitle}>{getTitle(location.pathname)}</h1>

      {menuOpen && <div className={styles.overlay} onClick={closeMenu}></div>}

      <div className={`${styles.menuContainer} ${menuOpen ? styles.show : ""}`}>
        <div className={styles.infos}>
          <h1>todo.</h1>
          <h2>{day}</h2>
          <p>{fullDate}</p>
        </div>

        <div className={styles.menu}>
          <Link
            to="/"
            className={`${styles.menuItem} ${
              isActive("/") ? styles.active : ""
            }`}
            onClick={closeMenu}
          >
            <FaHome className={styles.iconItem} /> Home
          </Link>
          <Link
            to="/tasks"
            className={`${styles.menuItem} ${
              isActive("/tasks") ? styles.active : ""
            }`}
            onClick={closeMenu}
          >
            <FaTasks className={styles.iconItem} /> Tasks
          </Link>
          <Link
            to="/notes"
            className={`${styles.menuItem} ${
              isActive("/notes") ? styles.active : ""
            }`}
            onClick={closeMenu}
          >
            <FaRegStickyNote className={styles.iconItem} /> Notes
          </Link>
          <div className={styles.buttonWrapper}>
            <AddTodoButton onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      {showModal && <TodoModal closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default Header;
