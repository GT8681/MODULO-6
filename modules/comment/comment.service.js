const commentSchema = require('./comment.schema');

const getComments = async (page,pageSize,blogPostId) => {
    const comments = await commentSchema.find({blogPost:blogPostId}).populate('author').populate('blogPost')
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

const createBlogPostComment = async (body) => {
    const newComment = new commentSchema(body);
    return await newComment.save();

}
const deleteBlogCommment = async (commentId) =>{
    return await commentSchema.findByIdAndDelete(commentId)

}




module.exports={
    getComments,
    createBlogPostComment,
    deleteBlogCommment
}