const { response } = require('express');
const blogService = require('./blog.service');
const Blog = require('./blog.schema');


const findAllBlog = async (req, res,) => {
    console.log('file ricevuto', req.file);
    console.log('body ricevuto',req.body);
    try {
        const blogPosts = await blogService.getBlogPosts();
        if (blogPosts.length === 0) {
            return res.status(404).send({
                statusCode: 404,
                message: "No blog posts found"
            });
        }
        res.status(200).send({
            statusCode: 200,
            blogPosts,
            message: "Blog posts retrieved successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "ERROR DURING THE REQUEST"
        });
    }
}


const findBlogOne = async (req, res) => {
    try {
        const { blogId } = req.params
        if (!blogId) {
            return res.status(400).send({
                statusCode: 400,
                message: "invalid request parameters"
            });
        }
        const blogPost = await blogService.getBlogPostById(blogId);
        if (!blogId) {
            return res.status(404).send({
                statusCode: 404,
                message: "Blog post not found"
            });

        }
        res.status(200).send({
            statusCode: 200,
            blogPost,
            message: "Blog post retrieved successfully"
        })
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "ERROR DURING THE REQUEST"
        });

    }
}


const createBlog = async (req, res) => {
    
    try {
      
      const newBlogData  ={
        ...req.body,
        cover : req.file ? req.file.path : ""
      };
    
       const blog = new Blog(newBlogData);
       await blog.save();
        res
        .status(201)
        .json(blog)

    } catch (error) {
        console.log('errore dettagliato',error.message);
        res.status(400).send({
            statusCode: 400,
            message: "errore di validazione" + error.message
        });
    }
}

const updateBlog = async (req, res) => {
    const { body } = req;
    const { blogId } = req.params;
    try {
        const updateBlogPost = await blogService.updateBlogPst(blogId, body);
        if (!blogId) {
            return res.status(400).send({
                statusCode: 400,
                message: "Blog post not found"
            });
        }
        res.status(200).send({
            statusCode: 200,
            updateBlogPost,
            message: "Blog post updated successfully"
        });


    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "ERROR DURING THE REQUEST"
        });

    }
}


const deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    try {
        if (!blogId) {
            return res.status(400).send({
                statusCode: 400,
                message: "Blog ID is required"
            });
        }

        const deletedBlogPost = await blogService.deleteBlog(blogId);

        if (!deletedBlogPost) {
            return res.status(404).send({
                statusCode: 404,
                message: "Blog post not found"
            });
        }

        res.status(200).send({
            statusCode: 200,
            deletedBlogPost,
            message: "Blog post deleted successfully"
        });
    } catch (error) {
        console.error("Error in deleteBlog:", error.message);
        res.status(500).send({
            statusCode: 500,
            message: error.message || "ERROR DURING THE REQUEST"
        });
    }
};


const uploadCloud = async (req, res) => {
    try {
       const img = req.file.path
       res
            .status(200)
            .json({ img : img})
    } catch (error) {
        console.log('errore upload', error)
        res.status(500).send({
            statusCode: 500,
            message: "ERROR DURING THE REQUEST"
        });
    }
}



module.exports = {
    findAllBlog,
    createBlog,
    findBlogOne,
    updateBlog,
    deleteBlog,
    uploadCloud
};
