const { sqlDb } = require("../../db");

const postCreateTrack = (req, res) => {
  const { title, youtube_url, id_album } = req.body;

  sqlDb
    .query(
      "INSERT INTO track(title, youtube_url, id_album) VALUES ( ?, ?, ?)",
      [title, youtube_url, id_album]
    )
    .then(([result]) => {
      res.location(`/track/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(`Error in postTrack ${err}`);
    });
};

const getTrack = (req, res) => {
  sqlDb
    .query("select * from track")
    .then(([result]) => {
      res.json({ result });
    })
    .catch((err) => {
      res.status(500).send(`Erreur dans la requête getTrack: ${err}`);
    });
};

const getTrackAlbumById = (req, res) => {
  const id_album = parseInt(req.params.id_album);
  sqlDb
    .query(`select * from track where id_album= ? `, [id_album])
    .then(([trackById]) => {
      res.json(trackById);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getTrackById = (req, res) => {
  const id = parseInt(req.params.id);
  sqlDb
    .query(`select * from track where id= ? `, [id])
    .then(([trackById]) => {
      res.json(trackById);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const updateTrack = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, youtube_url, id_album } = req.body;

  sqlDb
    .query(
      "update track set title = ?, youtube_url = ?, id_album = ? where id = ?",
      [title, youtube_url, id_album, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the track");
    });
};

const deleteTrack = (req, res) => {
  const id = parseInt(req.params.id);
  sqlDb
    .query("delete from track where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: `track was not found in db` });
      } else {
        res
          .status(200)
          .json({ message: `track number: ${id} has been deleted` });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `track number: ${id} was not deleted because of error, ${err}`,
      });
    });
};

module.exports = {
  postCreateTrack,
  getTrack,
  getTrackAlbumById,
  getTrackById,
  updateTrack,
  deleteTrack,
};
