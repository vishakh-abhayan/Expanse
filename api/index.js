const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction.js");
app.use(cors());
app.use(express.json());
app.get("/api/test", (req, res) => {
  res.send("hello");
});

app.post("/api/transaction", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const { name, price, dt, dis } = req.body;
  const transaction = await Transaction.create({ name, price, dt, dis });
  res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URL);
  const transact = await Transaction.find();
  res.json(transact);
});

app.listen(8000);
//
