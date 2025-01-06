import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/register.module.css"; // Anpassa sökvägen till din CSS

export default function RegisterForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

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
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setMessage("User created, you will be directed to login!");
        setErrors({});
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        if (data.errors) {
          const fieldErrors = {};
          data.errors.forEach((error) => {
            fieldErrors[error.path] = error.msg;
          });
          setErrors(fieldErrors);
        } else {
          setErrors({
            general: "An error occurred, but no details were provided.",
          });
          setSubmitting(false);
        }
      }
    } catch (error) {
      setErrors({ general: "An unexpected error occurred." });
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className={styles.regContainer}>
        <h1>Register</h1>

        {errors.general && (
          <div style={{ color: "red", marginBottom: "15px" }}>
            {errors.general}
          </div>
        )}

        <div className={styles.regForm}>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              {errors.username && (
                <p className={styles.errorText}>{errors.username}</p>
              )}
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
              {errors.email && (
                <p className={styles.errorText}>{errors.email}</p>
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              {errors.password && (
                <p className={styles.errorText}>{errors.password}</p>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              {errors.repeatPassword && (
                <p className={styles.errorText}>{errors.repeatPassword}</p>
              )}
              <input
                type="password"
                name="repeatPassword"
                placeholder="Repeat Password"
                value={formData.repeatPassword}
                onChange={handleChange}
                required
              />
            </div>

            {success && (
          <div style={{ color: "green", fontWeight: "bold", marginBottom: "15px", marginTop: "-10px" }}>{message}</div>
        )}

            <button
              type="submit"
              disabled={submitting}
              className={styles.regButton}
            >
              {submitting ? "REGISTERING..." : "REGISTER"}
            </button>
          </form>

          <h4
            style={{ marginTop: "10px", fontWeight: "400", fontSize: "14px", color: "white" }}
          >
            Already have an account?{" "}
            <Link to="/signin">
              <span style={{ color: "#FF6500", textDecoration: "underline" }}>
                Log in
              </span>
            </Link>{" "}
          </h4>
        </div>
      </div>
    </div>
  );
}
