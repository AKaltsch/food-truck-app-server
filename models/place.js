const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Place", placeSchema);
