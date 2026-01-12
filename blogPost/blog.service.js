const blogSchema = require("./blog.schema");
const BlogSchema = require("./blog.schema");

const getBlogPosts = async () => {
    const blogPosts = await BlogSchema.find().populate('author');
    return blogPosts;

}

const getBlogPostById = async (blogId) => {
    const blog = await BlogSchema.findById(blogId).populate('author');
    return blog;
}


const createBlogPost = async (body) => {
    const newBlogPost = new BlogSchema(body)
    const saveBlogPost = await newBlogPost.save()
    return saveBlogPost;
}

const updateBlogPst = async (blogId,body) => {
const newBlogPost = {new:true}
return await BlogSchema.findByIdAndUpdate(blogId,body,newBlogPost)
}


const deleteBlog = async (blogId) => {
    return await BlogSchema.findByIdAndDelete(blogId)

}





module.exports = {
    getBlogPosts,
    createBlogPost,
    getBlogPostById,
    updateBlogPst,
    deleteBlog
}


