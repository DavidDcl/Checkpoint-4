const { findOneByUsername } = require("../models/userManager");

const checkUserExists = async (req, res, next) => {
  const [user] = await findOneByUsername(req.body.username);

  if (!user.length) {
    return res.status(400).json({ message: "User doesn't exists" });
  }
  [req.user] = user;
  return next();
};

module.exports = checkUserExists;
