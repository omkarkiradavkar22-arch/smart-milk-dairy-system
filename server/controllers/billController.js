const Bill = require("../models/Bill");
const MilkDelivery = require("../models/MilkDelivery");


// GENERATE MONTHLY BILL
const generateBill = async (req, res) => {

  try {

    const { customerId, month, pricePerLiter } = req.body;

    // get deliveries
    const deliveries = await MilkDelivery.find({
      customer: customerId,
      status: "delivered",
    });

    // calculate milk total
    let totalMilkCost = 0;

    deliveries.forEach((delivery) => {

      totalMilkCost +=
        delivery.quantity * pricePerLiter;

    });

    // total amount
    const totalAmount = totalMilkCost;

    // create bill
    const bill = await Bill.create({
      customer: customerId,
      month,
      totalMilkCost,
      totalAmount,
    });

    res.status(201).json({
      message: "Bill Generated",
      bill,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET BILLS
const getBills = async (req, res) => {

  try {

    const bills = await Bill
      .find()
      .populate("customer");

    res.status(200).json(bills);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// MARK PAYMENT
const markPayment = async (req, res) => {

  try {

    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: "paid",
      },
      {
        new: true,
      }
    );

    if (!bill) {

      return res.status(404).json({
        message: "Bill not found",
      });

    }

    res.status(200).json({
      message: "Payment Updated",
      bill,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  generateBill,
  getBills,
  markPayment,
};