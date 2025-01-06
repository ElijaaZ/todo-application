const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-vercel-backend.vercel.app/api" // Backend på Vercel
    : "http://localhost:5000/api"; // Backend lokalt

export default API_BASE_URL;