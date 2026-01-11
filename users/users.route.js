const express = require("express");
const usersController = require("./users.controller");

const router = express.Router();

router.get("/users", usersController.findAll);


module.exports = router;