const express = require("express");

const {
  generateBill,
  getBills,
  markPayment,
} = require("../controllers/billController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// GENERATE BILL
router.post("/", protect, generateBill);


// GET BILLS
router.get("/", protect, getBills);

// MARK PAYMENT
router.put(
  "/:id/pay",
  protect,
  markPayment
);
module.exports = router;