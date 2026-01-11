const UserSchema = require('./users.schema');

const getUsers = async () => {
    const users = await UserSchema.find();
    return users;
}


module.exports = {
    getUsers
}