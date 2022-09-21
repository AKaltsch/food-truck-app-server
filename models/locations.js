const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const locationsSchema = new Schema({
  places: [
    {
      place: { type: Object, required: true },
    },
  ],
});

module.exports = mongoose.model("locations", locationsSchema);
