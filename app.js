const express = require("express");
const app = express();
const mongoose = require("mongoose");

const MONGODB_URI = "mongodb://127.0.0.1:27017/ds";
const authRoutes = require("./routes/auth");
const publicationRoutes = require("./routes/publication");

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader(
    "Acces-Control-Allow-Header",
    "Origin, X-Requested-With, Content, Accept, Content-Type ,Authorization"
  );
  res.setHeader(
    "Acces-Control-Allow-Methods",
    "GET, POST, PUT , DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use("/api/auth", authRoutes);
app.use("/api/publication", publicationRoutes);


module.exports = app;
