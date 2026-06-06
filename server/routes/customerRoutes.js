const express = require("express");

const {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ADD CUSTOMER
router.post("/", protect, addCustomer);


// GET CUSTOMERS
router.get("/", protect, getCustomers);


// UPDATE CUSTOMER
router.put("/:id", protect, updateCustomer);


// DELETE CUSTOMER
router.delete("/:id", protect, deleteCustomer);

module.exports = router;