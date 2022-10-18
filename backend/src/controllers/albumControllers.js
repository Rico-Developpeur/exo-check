const { sqlDb } = require("../../db");

const postCreateAlbum = (req, res) => {
  const { title, genre, picture, artist } = req.body;

  sqlDb
    .query(
      "INSERT INTO album(title, genre, picture, artist) VALUES ( ?, ?, ?, ?)",
      [title, genre, picture, artist]
    )
    .then(([result]) => {
      res.location(`/album/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(`Error in postAlbum ${err}`);
    });
};

const getAlbum = (req, res) => {
  sqlDb
    .query("select * from album")
    .then(([result]) => {
      res.json({ result });
    })
    .catch((err) => {
      res.status(500).send(`Erreur dans la requête getAlbum: ${err}`);
    });
};

const getAlbumById = (req, res) => {
  const id = parseInt(req.params.id);
  sqlDb
    .query(`select * from album where id= ? `, [id])
    .then(([albumById]) => {
      res.json(albumById);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const updateAlbum = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, genre, picture, artist } = req.body;

  sqlDb
    .query(
      "update album set title = ?, genre = ?, picture = ?, artist = ? where id = ?",
      [title, genre, picture, artist, id]
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
      res.status(500).send("Error editing the album");
    });
};

const deleteAlbum = (req, res) => {
  const id = parseInt(req.params.id);
  sqlDb
    .query("delete from album where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).json({ message: `album was not found in db` });
      } else {
        res
          .status(200)
          .json({ message: `album number: ${id} has been deleted` });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `album number: ${id} was not deleted because of error, ${err}`,
      });
    });
};

module.exports = {
  postCreateAlbum,
  getAlbum,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
};
