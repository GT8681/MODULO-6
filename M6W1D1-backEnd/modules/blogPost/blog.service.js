const commentSchema = require("../comment/comment.schema");
const blogSchema = require("./blog.schema");


const getBlogPosts = async () => {
   return await blogSchema.find()
   .populate('author','name surname')
   .populate('comments');

}

const getBlogPostById = async (blogId) => {
    const blog = await blogSchema.findById(blogId)
    .populate('author')
    .populate('comments');
    return blog;
}


const createBlogPost = async (body) => {
    const newBlogPost = new blogSchema(body)
    const saveBlogPost = await newBlogPost.save()
    return saveBlogPost;
}

const updateBlogPst = async (blogId,body) => {
const newBlogPost = {new:true}
return await blogSchema.findByIdAndUpdate(blogId,body,newBlogPost)
}

const deleteBlog = async (blogId) => {
    return await blogSchema.findByIdAndDelete(blogId)
  
   
}




module.exports = {
    getBlogPosts,
    createBlogPost,
    getBlogPostById,
    updateBlogPst,
    deleteBlog
}


