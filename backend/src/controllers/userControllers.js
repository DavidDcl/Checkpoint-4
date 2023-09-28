const {
  findOneByEmail,
  updateOne,

  destroyOneUser,
} = require("../models/userManager");

const browse = (req, res) => {
  findOneByEmail(req.body.email)
    .then(([result]) => {
      const resultat = result;
      delete resultat[0].password;
      res.status(200).send(result[0]);
    })
    .catch((e) => console.error(e));
};

const update = (req, res) => {
  const user = req.body;
  const { id } = req.params;
  updateOne(user, id)
    .then(([result]) => {
      if (result.affectedRows) {
        res.sendStatus(201);
      } else {
        res.status(400).json({ msg: "you can't update your data" });
      }
    })
    .catch((err) => console.error(err));
};

const removeOneUser = (req, res) => {
  destroyOneUser(req.params.userId)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  update,

  removeOneUser,
};
