const mongoose = require("mongoose");

const DBSchema = mongoose.Schema({
  codeId: {
    type: String,
    required: true,
    unique: true,
  },
  codeText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

const DBModel = mongoose.model("User", DBSchema);

module.exports = DBModel;
