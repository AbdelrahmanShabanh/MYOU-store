const express = require("express");
const Product = require("../models/Product");
const { auth, admin } = require("../middleware/auth");

const router = express.Router();

// List all products (optionally filter by category or featured)
router.get("/", async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured === "true") filter.featured = true;
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create product (admin only)
router.post("/", auth, admin, async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      discount: req.body.discount || 0,
      featured: req.body.featured || false,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update product (admin only)
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const update = {
      ...req.body,
      discount: req.body.discount || 0,
      featured: req.body.featured || false,
    };
    const product = await Product.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete product (admin only)
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
