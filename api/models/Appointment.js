const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer",
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const model = mongoose.model("Appointment", schema);
module.exports = model;
