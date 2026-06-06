const express = require("express");

const {
  addTransaction,
  getTransactions,
} = require("../controllers/transactionController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ADD TRANSACTION
router.post("/", protect, addTransaction);


// GET TRANSACTIONS
router.get("/", protect, getTransactions);

module.exports = router;