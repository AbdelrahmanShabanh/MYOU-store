const express = require("express");
const PromoCode = require("../models/PromoCode");
const { auth, admin } = require("../middleware/auth");

const router = express.Router();

// List all promo codes (admin only)
router.get("/", auth, admin, async (req, res) => {
  try {
    const codes = await PromoCode.find();
    res.json(codes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create promo code (admin only)
router.post("/", auth, admin, async (req, res) => {
  try {
    const code = new PromoCode(req.body);
    await code.save();
    res.status(201).json(code);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update promo code (admin only)
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const code = await PromoCode.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!code) return res.status(404).json({ message: "Promo code not found" });
    res.json(code);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete promo code (admin only)
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    await PromoCode.findByIdAndDelete(req.params.id);
    res.json({ message: "Promo code deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Validate promo code (public, for checkout)
router.post("/validate", async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    const promo = await PromoCode.findOne({ code });
    if (!promo)
      return res.status(404).json({ message: "Promo code not found" });
    if (promo.expiry && new Date() > promo.expiry)
      return res.status(400).json({ message: "Promo code expired" });
    if (promo.usageLimit && promo.usedCount >= promo.usageLimit)
      return res
        .status(400)
        .json({ message: "Promo code usage limit reached" });
    if (orderTotal < promo.minOrder)
      return res
        .status(400)
        .json({ message: `Minimum order value is ${promo.minOrder}` });
    res.json(promo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
