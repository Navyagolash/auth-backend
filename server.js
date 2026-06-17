// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const authRoutes = require("./routes/auth.routes");

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect("mongodb+srv://logindb:testdb@cluster0.z7wzh1e.mongodb.net/loginDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.error("❌ MongoDB Error:", err));

// app.use("/api/auth", authRoutes);

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// require("dotenv").config();
console.log("Email:", process.env.EMAIL_USER);
console.log("Pass:", process.env.EMAIL_PASS ? "Loaded" : "Missing");


const app = express();
app.use(express.json());
app.use(cors({
  origin: "*"  // or ["https://your-vercel-app.vercel.app"]
}));

// MongoDB connection
mongoose.connect("mongodb+srv://logindb:testdb@cluster0.z7wzh1e.mongodb.net/loginDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


app.listen(5000, () => console.log("🚀 Server running on port 5000"));
