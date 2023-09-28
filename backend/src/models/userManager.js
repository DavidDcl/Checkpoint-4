const database = require("./index");

const table = "users";

const findOneByUsername = (username) => {
  return database.query(`select * from ${table} where username = ?`, [
    username,
  ]);
};

const updateOne = (user, id) => {
  const query = `update ${table} set username = ?, first_name = ?, surname = ?  where id = ?`;
  return database.query(query, [
    user.username,
    user.firstName,
    user.surname,
    id,
  ]);
};
const createOne = (user) => {
  const query = `insert into ${table} (username, password)  values (?, ?)`;
  return database.query(query, [user.username, user.password]);
};

const destroyOneUser = (id) => {
  return database.query(`delete from ${table} where id =?`, [id]);
};

module.exports = {
  findOneByUsername,
  destroyOneUser,
  createOne,
  updateOne,
};
