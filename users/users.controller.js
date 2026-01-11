const {response} = require("express");
const usersService = require('./users.service');


const findAll = async (req, res,) => {
    try {
        const users = await usersService.getUsers();
        if (users.length === 0) {
            return res.status(404).send({
                statusCode : 404,
                message : "No users found"
            })
        }
        res.status(200).send({
            statusCode : 200,        
            users,
            message : "Users retrieved successfully"
        });
    } catch (error) {
        res.status(500).send({
            statusCode: 500,
            message: "ERROR DURING THE REQUEST" 
        });
    }
}

module.exports = {
    findAll
}