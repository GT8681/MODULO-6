const express= require('express');
const authorController = require('./author.controller');


const router = express.Router();


router.get("/authors", authorController.findAll);
router.get("/authors/:userId", authorController.findOne);
router.post("/authors", authorController.create);
router.patch("/authors/:userId", authorController.update);
router.delete("/authors/:userId", authorController.deleteAuthor);




module.exports = router;

