const asyncHandler = require("express-async-handler");
const Place = require("../models/Place");
const jwt = require("jsonwebtoken");
const Booking = require("../models/Booking");

const addPlace = asyncHandler(async (req, res) => {
  const { token } = req.cookies;

  const {
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  //Verify token
  const userData = jwt.verify(token, process.env.JWT_SECRET);

  const placeDoc = await Place.create({
    postedBy: userData.id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  });

  res.status(201).json(placeDoc);
});

const getuserPlaces = asyncHandler(async (req, res) => {
  const { token } = req.cookies;

  //Verify token
  const userData = jwt.verify(token, process.env.JWT_SECRET);

  const userPlaceDoc = await Place.find({ postedBy: userData.id });

  res.status(200).json(userPlaceDoc);
});

const getPlaces = asyncHandler(async (req, res) => {
  const placesDoc = await Place.find({});

  res.status(200).json(placesDoc);
});

const getPlace = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const placeDoc = await Place.findById(id);

  res.status(200).json(placeDoc);
});

const updatePlace = asyncHandler(async (req, res) => {
  const { token } = req.cookies;

  const {
    id,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  //Verify token
  const userData = jwt.verify(token, process.env.JWT_SECRET);

  const placeDoc = await Place.findById(id);

  if (userData.id === placeDoc.postedBy.toString()) {
    placeDoc.set({
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    });

    await placeDoc.save();
    res.status(201).json(placeDoc);
  } else {
    res.status(401);
    throw new Error("unable to performe request");
  }
});

const bookPlace = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  const { place, name, checkIn, checkOut, maxGuests, mobile, price } = req.body;

  //Verify token
  const userData = jwt.verify(token, process.env.JWT_SECRET);

  const bookingDoc = await Booking.create({
    place,
    user: userData.id,
    name,
    checkIn,
    checkOut,
    mobile,
    price,
    maxGuests,
  });

  res.status(201).json(bookingDoc);
});

const getBookings = asyncHandler(async (req, res) => {
  const { token } = req.cookies;

  const userData = jwt.verify(token, process.env.JWT_SECRET);

  const bookingDoc = await Booking.find({ user: userData.id }).populate(
    "place"
  );

  res.status(201).json(bookingDoc);
});

const getBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const bookingDoc = await Booking.findById(id);

  res.status(200).json(bookingDoc);
});

module.exports = {
  addPlace,
  getuserPlaces,
  getPlace,
  updatePlace,
  getPlaces,
  bookPlace,
  getBookings,
  getBooking,
};
