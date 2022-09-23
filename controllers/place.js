const Place = require("../models/place");

exports.postPlace = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const artistName = req.body.artistName;
  const lng = req.body.lng;
  const lat = req.body.lat;
  const dateUploaded = req.body.dateUploaded;

  const place = new Place({
    title: title,
    imageUrl: imageUrl,
    artistName: artistName,
    lat: lat,
    lng: lng,
    dateUploaded: dateUploaded,
  });

  place
    .save()
    .then((result) => {
      console.log("place created!!!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getPlaces = (req, res, next) => {
  Place.find()
    .then((places) => {
      res.send({ places: places });
    })
    .catch((err) => console.log(err));
};
