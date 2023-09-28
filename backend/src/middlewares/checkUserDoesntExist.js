const { findOneByUsername } = require("../models/userManager");

const checkUserDoesntExists = async (req, res, next) => {
  const [user] = await findOneByUsername(req.body.username);

  if (user.length) {
    return res.status(400).json({ message: "User already exists" });
  }

  return next();
};

module.exports = checkUserDoesntExists;
