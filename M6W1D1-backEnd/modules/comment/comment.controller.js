
const commentService = require('./comment.service');

const findCommentsByBlogPost = async (req, res) => {
    
    const{page=1,pageSize=4}=req.query
    try {
        const{
            totalComments,
            totalPages,
            comments
        }= await commentService.getComments(page,pageSize);
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

const getCommentById = async (req,res) => {
    
    try {
        const {id,commentId}=req.params;
        const comment = await commentService.getSingleCommentPost(id,commentId);
        if(!comment){
            return res.status(404).send({
                statusCode:404,
                message:"Comment not found"
            });
        } 
        res.status(200).send({
            statusCode:200,
            comment,
            message:"Comment retrieved successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"ERROR DURING THE REQUEST"
        });
        
    }
}

const getCommentByPostId = async (req,res) =>{

    try {
        const {postId}=req.params;
        const comments = await commentService.getCommentsByBlogPostId(postId);
        if(comments.length===0){
            return res.status(404).send({
                statusCode:404,
                message:"No comments found for this blog post"
            });
        }
        res.status(200).send({
            statusCode:200,
            comments,
            message:"Comments retrieved successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"ERROR DURING THE REQUEST"
        });
        
    }
}



const createComment  = async (req, res) => {
   
    try { 
        const body  = req.body;
        console.log('dati ricevuti dal controller' , body);
        const {postId}=req.params;
        const newComment = await commentService.createBlogPostComment(postId,body);
        res.status(201).send({
            statusCode: 201,
            newComment,
            message: "Comment created successfully"
        });
    } catch (error) {
        console.error('Errore nel servizio',error);
        res.status(500).send({
            statusCode: 500,
            message: "ERROR 500"
        });
    }
}

const update = async (req,res) =>{
    const {postId,commentId}=req.params;
    const {body} = req
    try {
        const updatedComment = await commentService.updateComment(postId,commentId,body);
        if(!updatedComment){
            return res.status(404).send({
                statusCode:404,
                message:"Comment not found"
            });
        }
        res.status(200).send({
            statusCode:200,
            updatedComment,
            message:"Comment updated successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"ERROR DURING THE REQUEST"
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
    getCommentById,
    getCommentByPostId,
    createComment,
    update,
    deleteComment
}