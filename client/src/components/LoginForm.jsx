import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css";
import { AuthContext } from "../context/AuthContext";

export default function LoginForm() {

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "LOGIN", payload: data.user });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrors({ general: data.errors ? data.errors[0].msg : "An unexpected error occurred." });
        setSubmitting(false);
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred." });
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.logContainer}>
        <h1>Sign In</h1>
        <div className={styles.logForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {errors.general && (
          <p style={{ color: 'red', marginTop: "-25px", marginBottom: "5px"}}>{errors.general}</p>
        )}

            <button
              type="submit"
              className={styles.logButton}
            >
              {submitting ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <h4 style={{ marginTop: "10px", fontWeight: "400", fontSize: "14px", color: "white"}}>
            Don't have an account yet?&nbsp;
            <Link to="/register">
              <span style={{ textDecoration: "underline", color: "#FF6500"}}>
                Sign up
              </span>
            </Link>
            &nbsp;here
          </h4>
        </div>
      </div>
    </div>
  );
}
