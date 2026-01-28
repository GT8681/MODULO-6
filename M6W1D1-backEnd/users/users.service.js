const usersSchema = require('./users.schema');
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


const findByEmail = async (email) =>{
  try {
    return await usersSchema.findOne({email:email});

  } catch (error) {
    throw error
  }

  

}


module.exports = {
    getUsers,
     createUser,
     findByEmail
}