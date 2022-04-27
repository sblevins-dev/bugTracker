const mongoose = require("mongoose");


const requestSchema = mongoose.Schema(
  {
    bug: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reason: {
      type: String,
    },
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    details: {
      type: String,
    },
    steps: {
      type: [String],
    },
    priority: {
      type: String,
    },
    assigned: {
      type: String,
      ref: "User",
    },
    author: {
      type: String,
      ref: "User",
    },
    comments: {
      type: [[String]],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Requests", requestSchema);

module.exports = model;