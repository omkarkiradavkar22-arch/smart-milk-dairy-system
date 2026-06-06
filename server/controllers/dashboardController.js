const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const Bill = require("../models/Bill");


// GET DASHBOARD STATS
const getDashboardStats = async (req, res) => {

  try {

    // counts
    const totalCustomers =
      await Customer.countDocuments();

    const totalProducts =
      await Product.countDocuments();

    const totalTransactions =
      await Transaction.countDocuments();

    // pending bills
    const pendingBills =
      await Bill.countDocuments({
        paymentStatus: "pending",
      });

    // total revenue
    const transactions =
      await Transaction.find();

    let totalRevenue = 0;

    transactions.forEach((transaction) => {

      totalRevenue += transaction.amount;

    });

    res.status(200).json({
      totalCustomers,
      totalProducts,
      totalTransactions,
      pendingBills,
      totalRevenue,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  getDashboardStats,
};