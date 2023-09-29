const {
  createOne,
  readOne,
  readAllByUserId,
} = require("../models/appointmentManager");

const insertAppointment = (req, res) => {
  const appointment = req.body;

  createOne(appointment)
    .then(([rows]) => {
      if (rows[0] === null) {
        res.status(400);
      } else {
        res.status(201);
        readOne().then(([data]) => {
          if (data[0] === null) {
            res.status(400);
          } else {
            res.send(data[0]);
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error inserting a new appointment");
    });
};

const getAppointmentByUserId = (req, res) => {
  const userId = req.params.id;

  readAllByUserId(userId)
    .then(([appointment]) => {
      if (appointment[0] === null) {
        res.status(400);
      } else {
        res.status(200).send(appointment);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving appointment");
    });
};

module.exports = {
  insertAppointment,
  getAppointmentByUserId,
};
