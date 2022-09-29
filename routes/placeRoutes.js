const express = require("express");
const router = express.Router();

const placeController = require("../controllers/place");

const verifyJWT = require("../middleware/auth");

router.post("/placeform", placeController.postPlace);

router.get("/places", placeController.getPlaces);

router.post("/delete-place", placeController.postDelete);

module.exports = router;
