const mongoose = require('mongoose');

const Users = new mongoose.Schema({
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    eyecolor: {
        type: String,
        required: false,
        default: ""
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    company:{
        type: String,
        required: false,
        default: ""
    }


}, { timestamps: true, strict: true });

module.exports = mongoose.model('user', Users, "users");

