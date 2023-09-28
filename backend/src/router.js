const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const doctorControllers = require("./controllers/doctorControllers");

router.get("/doctors", doctorControllers.browse);

const userControllers = require("./controllers/userControllers");

router.put("/users/:id", userControllers.update);
const {
  signIn,
  signUp,
  logout,
} = require("./controllers/connexionControllers");
const checkUserDoesntExists = require("./middlewares/checkUserDoesntExist");
const checkUserExists = require("./middlewares/checkUserExist");
const validateConnexion = require("./middlewares/connexion.validate");
const validateInscription = require("./middlewares/inscription.validate");
const hashPassword = require("./middlewares/hashPassword");

router.post("/signin", validateConnexion, checkUserExists, signIn);
router.post(
  "/signup",
  validateInscription,
  checkUserDoesntExists,
  hashPassword,
  signUp
);

router.get("/logout", logout);

module.exports = router;
