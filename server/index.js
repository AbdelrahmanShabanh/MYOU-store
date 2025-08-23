const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Debug: Read .env file directly
const envPath = path.join(__dirname, ".env");
console.log("Looking for .env at:", envPath);
if (fs.existsSync(envPath)) {
  console.log(".env file exists");
  const envContent = fs.readFileSync(envPath, "utf8");
  console.log("Raw .env content:", envContent);
} else {
  console.log(".env file does not exist");
}

require("dotenv").config();
console.log("MONGODB_URI:", process.env.MONGODB_URI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");
const cartRoutes = require("./routes/cart");
const adminRoutes = require("./routes/admin");
const uploadRoutes = require("./routes/upload");
const promoCodesRoutes = require("./routes/promocodes");
const { auth, admin } = require("./middleware/auth");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", auth, orderRoutes); // Require auth for orders
app.use("/api/cart", auth, cartRoutes); // Require auth for cart
app.use("/api/admin", auth, admin, adminRoutes); // Require admin for admin routes
app.use("/api/upload", auth, admin, uploadRoutes); // Require admin for uploads
app.use("/api/promocodes", promoCodesRoutes);

// Example route
app.get("/", (req, res) => {
  res.send("API is running");
});

// TODO: Add routes for auth, products, categories, orders, admin, upload

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
