const express = require("express");
const router = express.Router();

const placeController = require("../controllers/place");

router.post("/placeform", placeController.postPlace);

router.get("/places", placeController.getPlaces);

module.exports = router;
