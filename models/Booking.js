const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    place: { type: mongoose.Schema.Types.ObjectId, ref: "Place" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: [true, "Please add a name"] },
    mobile: { type: String, required: [true, "Please add phone number"] },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    maxGuests: { type: Number },
    price: { type: Number },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
