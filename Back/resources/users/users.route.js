const express = require("express");
const { validateUser } = require("../middlewares/validateUser");
const { authentification } = require("../middlewares/authentification");

const {
  signUp,
  getAllUsers,
  logIn,
  deleteUser,
  getUser,
  updateUser
} = require("./users.controller");

const router = express.Router();

router.route("").get(getAllUsers);
router.route("/signup").post(validateUser, signUp);
router.route("/login").post(logIn);
router.route("/user").delete(authentification, deleteUser).get(authentification, getUser).put(authentification, updateUser);
module.exports = router;
