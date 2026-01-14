const express = require('express');
const commentController = require('./comment.controller');
const router = express.Router();

router.get("/blogPost/:id/comments", commentController.findCommentsByBlogPost);
router.post("/blogPost/:id", commentController.createComment);
router.delete("/blogPost/:commentId", commentController.deleteComment);





module.exports = router;