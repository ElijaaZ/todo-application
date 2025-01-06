import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../api/apiConfig";
import { AuthContext } from "../context/AuthContext";
import styles from "../styles/header.module.css";
import {
  FaHome,
  FaTasks,
  FaUserPlus,
  FaSignInAlt
} from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { PiSignOut } from "react-icons/pi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const date = new Date();
  const day = date.toLocaleDateString("en-US", { weekday: "long" });
  const fullDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const handleSignOut = async () => {
    await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setMenuOpen(false);
  };

  const getTitle = (path) => {
    switch (path) {
      case "/":
        return "Home";
      case "/tasks":
        return "Tasks";
      case "/createtodos":
        return "Create Todo";
      case "/calendar":
        return "Calendar";
      case "/register":
        return "Register";
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

      {menuOpen && (
        <div
          className={`${styles.menuContainer} ${menuOpen ? styles.open : ""}`}
        >
          <div className={styles.infos}>
            <h1>taskio.</h1>
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
          </div>

          <div className={styles.divider}></div>

          <div className={styles.menu}>
            <Link
              to="/createtodos"
              className={`${styles.menuItem} ${
                isActive("/createtodos") ? styles.active : ""
              }`}
              onClick={closeMenu}
            >
              <AiOutlinePlusCircle className={styles.iconItem} /> Create Todo
            </Link>
            {!user && (
              <Link
                to="/register"
                className={`${styles.menuItem} ${
                  isActive("/register") ? styles.active : ""
                }`}
                onClick={closeMenu}
              >
                <FaUserPlus className={styles.iconItem} /> Register
              </Link>
            )}
            {!user && (
              <Link
                to="/signin"
                className={`${styles.menuItem} ${
                  isActive("/signin") ? styles.active : ""
                }`}
                onClick={closeMenu}
              >
                <FaSignInAlt className={styles.iconItem} /> Sign In
              </Link>
            )}
          </div>
          

          {user && (
            <div className={styles.menu}>
              <Link to="#" className={styles.menuItem} onClick={handleSignOut}>
                <PiSignOut className={styles.iconItem} />
                Sign out
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
