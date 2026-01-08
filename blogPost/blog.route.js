const express= require('express');
const blogController = require('./blog.controller');

const router = express.Router();


router.get("/blogPost", blogController.findAllBlog);
router.post("/blogPost", blogController.createBlog);




module.exports = router;