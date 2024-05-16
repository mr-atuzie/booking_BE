const express = require("express");
const {
  addPlace,
  getuserPlaces,
  getPlace,
  updatePlace,
  getPlaces,
  bookPlace,
} = require("../controllers/place");

const router = express.Router();

router.post("/", addPlace);
router.post("/book", bookPlace);
router.put("/", updatePlace);
router.get("/user-place", getuserPlaces);
router.get("/:id", getPlace);
router.get("/", getPlaces);

module.exports = router;
