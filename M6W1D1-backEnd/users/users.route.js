const express = require("express");
const usersController = require("./users.controller");

const router = express.Router();

router.get("/users", usersController.findAll);
router.post("/users", usersController.newUser);


module.exports = router;