const MilkDelivery = require("../models/MilkDelivery");


// MARK DELIVERY
const markDelivery = async (req, res) => {

  try {

    const delivery = await MilkDelivery.create(req.body);

    res.status(201).json({
      message: "Delivery Marked",
      delivery,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET DELIVERY HISTORY
const getDeliveryHistory = async (req, res) => {

  try {

    const deliveries = await MilkDelivery
      .find()
      .populate("customer");

    res.status(200).json(deliveries);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  markDelivery,
  getDeliveryHistory,
};