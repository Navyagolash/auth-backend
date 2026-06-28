require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
console.log("Email:", process.env.EMAIL_USER);
console.log("Pass:", process.env.EMAIL_PASS ? "Loaded" : "Missing");


const app = express();
app.use(express.json());
app.use(cors({
  origin: "*"  
}));

mongoose.connect("mongodb+srv://logindb:testdb@cluster0.z7wzh1e.mongodb.net/loginDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


app.listen(5000, () => console.log("Server running Successfully on port 5000"));
