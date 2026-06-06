const express = require("express");

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ADD PRODUCT
router.post("/", protect, addProduct);


// GET PRODUCTS
router.get("/", protect, getProducts);


// UPDATE PRODUCT
router.put("/:id", protect, updateProduct);


// DELETE PRODUCT
router.delete("/:id", protect, deleteProduct);

module.exports = router;