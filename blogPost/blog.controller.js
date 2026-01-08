const {response}=require('express');
const blogService=require('./blog.service');


const findAllBlog=async(req,res,)=>{
    try{
        const blogPosts=await blogService.getBlogPosts();
        if(blogPosts.length===0){
            return res.status(404).send({
                statusCode:404,
                message:"No blog posts found"
            });
        }
        res.status(200).send({
            statusCode:200,
            blogPosts,
            message:"Blog posts retrieved successfully"
        });
    }catch(error){
        res.status(500).send({
            statusCode:500,
            message:"ERROR DURING THE REQUEST"
        });
    }
}


const createBlog = async(req,res)=>{
    const{body}=req;
    try{
        const newBlogPost=await blogService.createBlogPost(body);
        res.status(201).send({
            statusCode:201,
            newBlogPost,
            message:"Blog post created successfully"
        });

}catch(error){
    res.status(500).send({
        statusCode:500,
        message:"ERROR DURING THE REQUEST"
    });
}
}

module.exports={
    findAllBlog,
    createBlog
};
    