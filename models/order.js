const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },

  items: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],

  total: {
    type: Number,
    required: true,
  },

  orderedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("Order", orderSchema);
