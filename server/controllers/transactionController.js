const Transaction = require("../models/Transaction");
const Product = require("../models/Product");


// ADD TRANSACTION
const addTransaction = async (req, res) => {

  try {

    const {
      type,
      customer,
      product,
      quantity,
      amount,
    } = req.body;

    // reduce stock if product transaction
    if (type === "product") {

      const existingProduct =
        await Product.findById(product);

      if (!existingProduct) {

        return res.status(404).json({
          message: "Product not found",
        });

      }

      // stock check
      if (existingProduct.stock < quantity) {

        return res.status(400).json({
          message: "Insufficient stock",
        });

      }

      existingProduct.stock -= quantity;

      await existingProduct.save();
    }

    // create transaction
    const transaction =
      await Transaction.create({
        type,
        customer,
        product,
        quantity,
        amount,
      });

    res.status(201).json({
      message: "Transaction Added",
      transaction,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET TRANSACTIONS
const getTransactions = async (req, res) => {

  try {

    const transactions =
      await Transaction.find()
        .populate("customer")
        .populate("product");

    res.status(200).json(transactions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  addTransaction,
  getTransactions,
};