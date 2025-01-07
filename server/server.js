// server.js eller app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config({ path: "./.env"});
const cookieParser = require("cookie-parser");

console.log("Server is starting...");

// express
const app = express();

const allowedOrigins = [
  'http://localhost:3000',
]

// cors
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Tillåt cookies
  })
); // Gör att din frontend kan kommunicera med din backend

// Middleware
app.use(express.json()); // Hanterar JSON-body i POST-begäran
app.use(cookieParser());

// db connection
mongoose.connect(process.env.MONGODB_URI, {})
.then(() => console.log('**DB CONNECTED**'))
.catch((error) => console.error("DB CONNECTION ERR => ", error));

// import routes
const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

// Routes
app.use('/api', authRoutes); // Använd auth-routes
app.use('/api', todoRoutes);


//Port
const port = process.env.PORT || 8000;

// Starta servern
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
