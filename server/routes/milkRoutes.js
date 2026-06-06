const express = require("express");

const {
  markDelivery,
  getDeliveryHistory,
} = require("../controllers/milkController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// MARK DELIVERY
router.post("/", protect, markDelivery);


// GET DELIVERY HISTORY
router.get("/", protect, getDeliveryHistory);

module.exports = router;