import React, { useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/header.module.css";
import { FaTasks, FaRegStickyNote } from "react-icons/fa";
import CreateButton from "../CreateButton";
import { useModal } from "../context/ModalContext";

const Header = ({ createTodo, createNote }) => {
  const { openModal } = useModal();
  const [menuOpen, setMenuOpen] = useState(false);
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

  const getTitle = useMemo(() => {
    switch (location.pathname) {
      case "/":
        return "Tasks";
      case "/notes":
        return "Notes";
      default:
        return "";
    }
  }, [location.pathname]);

  const handleAddClick = () => {
    if (location.pathname === "/") {
      openModal("create-todo", {
        onCreate: createTodo,
      });
    } else if (location.pathname === "/notes") {
      openModal("create-note", {
        onCreate: createNote,
      });
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <h1 className={styles.pageTitle}>{getTitle}</h1>

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
            <CreateButton onClick={handleAddClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
