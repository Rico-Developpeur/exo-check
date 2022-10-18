const express = require("express");

const router = express.Router();

const albumControllers = require("./controllers/albumControllers");
const trackControllers = require("./controllers/trackControllers");

router.post("/album", albumControllers.postCreateAlbum);
router.get("/album", albumControllers.getAlbum);
router.get("/album/:id", albumControllers.getAlbumById);
router.put("/album/:id", albumControllers.updateAlbum);
router.delete("/album/:id", albumControllers.deleteAlbum);

router.post("/track", trackControllers.postCreateTrack);
router.get("/track", trackControllers.getTrack);
router.get("/trackAlbum/:id_album", trackControllers.getTrackAlbumById);
router.get("/track/:id", trackControllers.getTrackById);
router.put("/track/:id", trackControllers.updateTrack);
router.delete("/track/:id", trackControllers.deleteTrack);

module.exports = router;
