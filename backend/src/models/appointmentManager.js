const database = require("./index");

const createOne = (appointment) => {
  const query = `INSERT INTO reservations (doctor_id, user_id, date, start_time, end_time) VALUES (?, ?, ?, ?, ?)`;

  return database.query(query, [
    appointment.doctorId,
    appointment.userId,
    appointment.date,
    appointment.startTime,
    appointment.endTime,
  ]);
};

const readOne = () => {
  const query = `SELECT r.date, r.start_time, d.first_name, d.surname  FROM reservations r join doctor d on r.doctor_id = d.id where r.id = (SELECT MAX(id)FROM reservations)`;

  return database.query(query);
};

const readAllByUserId = (userId) => {
  const qeury = `SELECT r.id, r.date, r.start_time, d.first_name, d.surname FROM reservations r join doctor d ON r.doctor_id = d.id WHERE user_id = ?`;
  return database.query(qeury, [userId]);
};

module.exports = { createOne, readOne, readAllByUserId };
