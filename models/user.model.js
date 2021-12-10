const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    nama: {type: String,  required: true, unique: true},
    userId: {type: String,  required: true, unique: true},
    admin: {type: Boolean, required: true},
    gender: {type: String, required: true},
    status: {type: String, required: true},
    email: {type: String,  required: true, unique: true},
    password: {type: String, required: true}
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}));

module.exports = User;