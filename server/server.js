// server.js eller app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

console.log("Server is starting...");

// express
const app = express();

const allowedOrigins = [
  "https://todo-application-1-9qa5.onrender.com",
  "http://localhost:3000",
];

// cors
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
); // Gör att din frontend kan kommunicera med din backend

// Middleware
app.use(express.json()); // Hanterar JSON-body i POST-begäran

// db connection
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("**DB CONNECTED**"))
  .catch((error) => console.error("DB CONNECTION ERR => ", error));

app.get("/api/ping", (_req, res) => {
  res.status(200).json({ message: "pong" });
});

// import routes
const todoRoutes = require("./routes/todo");
const noteRoutes = require("./routes/notes");

// Routes
app.use("/api", todoRoutes);
app.use("/api", noteRoutes);

//Port
const port = process.env.PORT || 8000;

// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
