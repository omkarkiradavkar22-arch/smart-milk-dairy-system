const Product = require("../models/Product");


// ADD PRODUCT
const addProduct = async (req, res) => {

  try {

    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product Added",
      product,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET PRODUCTS
const getProducts = async (req, res) => {

  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {

  try {

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product Updated",
      product,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      message: "Product Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};