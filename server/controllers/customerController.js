const Customer = require("../models/Customer");


// ADD CUSTOMER
const addCustomer = async (req, res) => {

  try {

    const customer = await Customer.create(req.body);

    res.status(201).json({
      message: "Customer Added",
      customer,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET CUSTOMERS
const getCustomers = async (req, res) => {

  try {

    const customers = await Customer.find();

    res.status(200).json(customers);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// UPDATE CUSTOMER
const updateCustomer = async (req, res) => {

  try {

    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      message: "Customer Updated",
      customer,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE CUSTOMER
const deleteCustomer = async (req, res) => {

  try {

    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await customer.deleteOne();

    res.status(200).json({
      message: "Customer Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};
module.exports = {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};