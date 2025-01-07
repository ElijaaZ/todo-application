const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://todo-application-topaz.vercel.app/api" // Backend i produktion
    : "http://localhost:5000/api"; // Backend lokalt

export default API_BASE_URL;