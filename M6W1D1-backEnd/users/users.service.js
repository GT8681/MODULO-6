const UserSchema = require('./users.schema');
const bcrypt = require('bcrypt');

const getUsers = async () => {
    const users = await UserSchema.find();
    return users;
}

const createUser = async (body) => {
    const saltRounds = 10;
    const newUser = new UserSchema({
    ...body,
    password: await bcrypt.hash(body.password, saltRounds)
    
    });
  return   await newUser.save();
    
}


module.exports = {
    getUsers,
     createUser
}