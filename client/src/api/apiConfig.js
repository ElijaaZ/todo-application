const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://todo-application-topaz.vercel.app/api"
    : "http://localhost:5000/api";

export default API_BASE_URL;