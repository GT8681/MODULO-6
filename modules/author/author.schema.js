const mongoose = require('mongoose');

const Author = new mongoose.Schema({
    name: { 
        type: String,
         required: true },
    surname:
     { type: String,
         required: true },
    email : {
         type: String,
          required: true,
           unique: true },
     dob:{
        type: Date,
         required: false,
         default:Date.now()
     },
     avatar:{
        type:String,
        required: false,
        default: "https://www.gravatar.com/avatar/"
     }

} , { timestamps: true,  strict: true });

module.exports = mongoose.model('author', Author, "authors");

