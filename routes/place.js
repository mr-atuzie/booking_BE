const express = require("express");
const {
  addPlace,
  getuserPlaces,
  getPlace,
  updatePlace,
  getPlaces,
  bookPlace,
  getBooking,
  getBookings,
} = require("../controllers/place");

const router = express.Router();

router.get("/bookings", getBookings);
router.get("/bookings/:id", getBooking);
router.post("/", addPlace);
router.post("/book", bookPlace);
router.put("/", updatePlace);
router.get("/user-place", getuserPlaces);
router.get("/:id", getPlace);
router.get("/", getPlaces);

module.exports = router;
