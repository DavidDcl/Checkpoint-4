const { getAll } = require("../models/doctorManager");

const browse = (req, res) => {
  getAll()
    .then(([doctors]) => res.status(200).send(doctors))
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports = { browse };
