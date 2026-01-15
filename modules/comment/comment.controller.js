
const commentService = require('./comment.service');

const findCommentsByBlogPost = async (req, res) => {
    const {blogPostId} = req.params;
    const{page=1,pageSize=4}=req.query
    try {
        const{
            totalComments,
            totalPages,
            comments
        }= await commentService.getComments(page,pageSize,blogPostId);
        if (comments.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: "No comments found for this blog post"
            });
        }
        res.status(200).send({
            statusCode: 200,
            page:Number(page),
            pageSize:Number(pageSize),
            totalComments:Number(totalComments),
            totalPages:Number(totalPages),
            comments,
            message: "Comments retrieved successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "ERROR DURING THE REQUEST"
        });
        
    }

}

const createComment  = async (req, res) => {
    const { body } = req;
    try {
        const newComment = await commentService.createBlogPostComment(body);
        res.status(201).send({
            statusCode: 201,
            newComment,
            message: "Comment created successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "ERROR DURING THE REQUEST"
        });
    }
}

const deleteComment = async (req,res) =>{
    const{commentId}=req.params;
    try {
        const deletedComment = await commentService.deleteBlogCommment(commentId);
        if(!deletedComment){
            return res.status(400).send({
                statusCode:400,
                message:"Comment not found"
            });
        }
        res.status(200).send({
            statusCode:200,
            deletedComment,
            message:"Comment deleted successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"ERROR DURING THE REQUEST"
        });
        
    }
}








module.exports = {
    findCommentsByBlogPost,
    createComment,
    deleteComment
}