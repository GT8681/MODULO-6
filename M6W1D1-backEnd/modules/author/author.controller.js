const { response } = require('express');
const authorService = require('./author.service');



const findAll = async (req, res,) => {
    try {
        const users = await authorService.getAuthors();
        if (users.length === 0) {
            return res.status(404).send({
                statusCode : 404,
                message : "No authors found"
            })
        }
        res.status(200).send({
            statusCode : 200,        
            users,
            message : "Authors retrieved successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "ERROR DURING THE REQUEST" 
        });
    }

}

const findOne = async (req, res) => {
    try {
        const {userId} = req.params
       
        if (!userId) {
            return res.status(400).send({
                statusCode: 400,
                message: "invalid request parameters"
            });
        }
        const author = await authorService.getAuthorId(userId);
        if (!author) {
            return res.status(404).send({
                statusCode: 404,
                message: "Author not found"
            });
        }
        res.status(200).send({
            statusCode: 200,
            author,
            message: "Author retrieved successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "ERROR DURING THE REQUEST"
        });
    }
}

const create = async (req,res) =>{
const {body} = req
    try {
    const newAuthor = await authorService.createAuthor(body);
    res.status(201).send({
        statusCode:201,
        newAuthor,
        message:"Author created successfully"
    });
} catch (error) {
    res.status(500).send({
        statusCode:500,
        message:"ERROR DURING THE REQUEST"
    });
    
}
}

const update = async (req,res) => {
const {body} = req
const {userId} = req.params
try {
    const updatedAuthor = await authorService.updateAuthor(userId, body);
if(!userId){
    return res.status(400).send({
        statusCode:400,
        message:"Invalid request parameters"
    });
}
res.status(200).send({
    statusCode:200,
    updatedAuthor,
    message:"Author updated successfully"
});
} catch (error) {
    res.status(500).send({
        statusCode:500,
        message:"ERROR DURING THE REQUEST"
    });
    
}
}

const deleteAuthor = async (req,res) => {
    const {userId} = req.params
    try {
        const deletedAuthor = await authorService.deleteAuthor(userId);
    if(!userId){
        return res.status(400).send({
            statusCode:400,
            message:"Invalid request parameters"
        });
    }
    res.status(200).send({
        statusCode:200,
        deletedAuthor,
        message:"Author deleted successfully"
    });
    } catch (error) {
        res.status(500).send({
            statusCode:500,
            message:"ERROR DURING THE REQUEST"
        });
        
    }
    }






module.exports = {
    findAll,
    findOne,
    create,
    update,
    deleteAuthor
}