const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: [true, "Please add a name"] },
    address: {
      type: String,
      trim: true,
      required: [true, "Please add an address"],
    },
    photo: [String],
    description: {
      type: String,
      trim: true,
      required: [true, "Please add an description"],
    },
    perks: [String],
    extra: [String],
    checkIn: { type: Number },
    checkOut: { type: Number },
    maxGuests: { type: Number },
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", placeSchema);
module.exports = Place;
