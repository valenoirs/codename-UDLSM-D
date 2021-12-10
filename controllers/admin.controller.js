const Joi = require('joi');

const User = require('../models/user.model');
const comparePassword = require('../utils/comparePassword');
const hashPassword = require('../utils/hashPassword');

module.exports.Login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            console.log("Cannot find user with corresponding email");
            return res.redirect('/admin/login');
        }

        const user = await User.findOne({email : email, admin: true});

        // Cek if user with that email exist
        if(!user) {
            console.log("Account not found");
            return res.redirect('/admin/login');
        }
        
        let isValid = comparePassword(password, user.password);
        
        if(!isValid) {
            console.log('Invalid Password!');
            return res.redirect('/admin/login');
        }

        // Success
        if(user.admin) {
            req.session.adminId = user.userId;

            console.log('Logged in!');
            // return res.redirect(`/admin/${user.userId}`);
            return res.redirect(`/admin/pengunjung`);
        }
        else{
            console.log('Account not found');;
            return res.redirect('/admin/login');
        }

    }
    catch(error) {
        console.error("Login Error", error);
        return res.redirect('/admin/login')
    }
};

exports.Logout = (req, res, next) => {
    delete req.session.adminId;
    return res.redirect('/admin/login');
}