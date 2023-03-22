const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const TransactionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dt: {
    type: Date,
    required: true,
  },
  dis: {
    type: String,
    required: true,
  },
});

const TransactionModel = model("Transaction", TransactionSchema);

module.exports = TransactionModel;
