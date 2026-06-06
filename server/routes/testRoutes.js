const express = require("express");

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();


// Protected Route
router.get("/dashboard", protect, (req, res) => {

  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });

});


// Admin Route
router.get(
  "/admin",
  protect,
  adminOnly,
  (req, res) => {

    res.json({
      message: "Welcome Admin",
    });

  }
);

module.exports = router;