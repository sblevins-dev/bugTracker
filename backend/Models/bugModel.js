const mongoose = require("mongoose");


const bugSchema = mongoose.Schema(
  {
    bug: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
      type: Number,
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

const model = mongoose.model("Bug", bugSchema);

module.exports = model;
