const express= require('express');
const blogController = require('./blog.controller');

const router = express.Router();


router.get("/blogPost", blogController.findAllBlog);
router.get("/blogPost/:blogId", blogController.findBlogOne);
router.post("/blogPost", blogController.createBlog);
router.patch("/blogPost/:blogId", blogController.updateBlog);
router.delete("/blogPost1/:blogId", blogController.deleteBlog);





module.exports = router;