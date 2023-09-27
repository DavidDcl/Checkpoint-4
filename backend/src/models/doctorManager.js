const database = require("./index");

const getAll = () => {
  return database.query("SELECT * FROM doctor");
};

module.exports = {
  getAll,
};
