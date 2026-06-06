const mongoose = require("mongoose");

const milkDeliverySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    
    shift: {
    type: String,
    enum: ["Morning", "Evening"],
   required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["delivered", "skipped"],
      default: "delivered",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MilkDelivery",
  milkDeliverySchema
);