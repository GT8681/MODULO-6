const BlogSchema = require('./blog.schema');

const getBlogPosts = async () => {
    const blogPosts = await BlogSchema.find();
    return blogPosts;

}



const createBlogPost = async (body) =>{
     const newBlogPost = new BlogSchema (body)
        const saveBlogPost = newBlogPost.save()
        return saveBlogPost;
}





module.exports = {
    getBlogPosts,
    createBlogPost
}


