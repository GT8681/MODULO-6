const bcrypt = require('bcrypt');
const UserSchema = require('../../users/users.schema');
const jwt = require('jsonwebtoken');


const login = async (body)  => {

const {email,password} = body;

const user = await UserSchema.findOne({email});

if(!user){
    throw new Error('User not found');

  }
const isPasswordValid = await bcrypt.compare(password,user.password);

if(!isPasswordValid){
    throw new Error('Invalid password');
  }

const token = jwt.sign({

       
        name: user.name,
        surname: user.surname,
        email: user.email
    },
    process.env.JWT_SECRET,
    {expiresIn: '1h'

    })

    return {token, user};
}

module.exports = {
    login
}