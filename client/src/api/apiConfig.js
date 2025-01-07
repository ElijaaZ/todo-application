const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "" // Backend i produktion
    : "http://localhost:5000/api"; // Backend lokalt

export default API_BASE_URL;