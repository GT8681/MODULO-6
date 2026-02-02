const express = require('express');
const commentController = require('./comment.controller');
const router = express.Router();





router.get("/blogPost/comments", commentController.findCommentsByBlogPost);
router.get("/blogPost/:id/comments/:commentId", commentController.getCommentById);
router.get("/blogPost/:postId/comments", commentController.getCommentByPostId);
router.post("/blogPost/:postId/comments", commentController.createComment);
router.patch("/blogPost/:id/comments/:commentId", commentController.update);
router.delete("/blogPost/:postId/comments/:commentId", commentController.deleteComment);





module.exports = router;