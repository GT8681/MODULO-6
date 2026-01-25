const commentSchema = require('./comment.schema');
const blogSchema = require('../blogPost/blog.schema');

const getComments = async (page,pageSize) => {
    const comments = await commentSchema.find()
    .populate('author','name surname')
    .limit(pageSize)
    .skip((page-1)*pageSize)

    const totalComments =  comments.length
    const totalPages = Math.ceil(totalComments/pageSize)
    return{
        page,
        pageSize,
        totalComments,
        totalPages,
        comments
    }
}

const getSingleCommentPost = async (postId,commentId) =>{
       const comment = await commentSchema.findOne({
        _id: commentId,
        blogPost: postId}).populate('author','name surname');
       return comment
}

const getCommentsByBlogPostId = async (postId) => {
    const comments = await commentSchema.find({blogPost:postId})
    .populate('author','name surname');
    return comments;
}

const createBlogPostComment = async (postId,body) => {
    
        const newComment = new commentSchema({
            ...body,
            blogPost: postId
        });
        const saveComment = await newComment.save();
        await blogSchema.findByIdAndUpdate(
            postId,
            { $push: { comments: saveComment._id } },
            {new: true}
        );
        return saveComment;
    } 
 

  

const deleteBlogCommment = async (commentId) =>{
    return await commentSchema.findByIdAndDelete(commentId)

}

const updateComment = async (postId,commentId,body) =>{
    const updateCommentPost = await commentSchema.findOneAndUpdate(
        { _id:commentId, blogPost:postId },
        { $set:body },
        { new:true, runValidators:true }
    )
    return updateCommentPost;

}







module.exports={
    getComments,
    getSingleCommentPost,
    getSingleCommentPost,
    getCommentsByBlogPostId,
    createBlogPostComment,
    deleteBlogCommment,
     updateComment
}