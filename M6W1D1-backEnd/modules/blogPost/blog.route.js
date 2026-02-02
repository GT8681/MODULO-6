const express= require('express');
const blogController = require('./blog.controller');
const {uploadCloud} = require('../../middlewares/uploads/index');

const router = express.Router();


router.get("/blogPost", blogController.findAllBlog);
router.get("/blogPost/:blogId", blogController.findBlogOne);
//router.post("/blogPost", blogController.createBlog);
router.patch("/blogPost/:blogId", blogController.updateBlog);
router.delete("/:blogId", blogController.deleteBlog);
router.post('/', uploadCloud.single('cover'), blogController.createBlog);






module.exports = router;