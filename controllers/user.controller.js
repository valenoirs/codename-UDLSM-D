const Joi = require('joi');
const {v4: uuidv4} = require('uuid');

const User = require('../models/user.model');
const Pengunjung = require('../models/pengunjung.model');
const comparePassword = require('../utils/comparePassword');
const hashPassword = require('../utils/hashPassword');

// Validate User
const userSchema = Joi.object().keys({
    nama: Joi.string(),
    admin: Joi.boolean(),
    gender: Joi.string(),
    status: Joi.string(),
    email: Joi.string().email({minDomainSegments: 2}),
    password: Joi.string().required().min(8),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
});

module.exports.Signup = async (req, res) => {
    try{
        const result = userSchema.validate(req.body);
        if (result.error) {
            console.log(result.error.message);
            console.error('validate-error', result.error);
            return res.redirect('/register');
        }

        let user = await User.findOne({
            email : result.value.email
        });

        if(user) {
            console.log('User with same email found!');
            return res.redirect('/register');
        }

        const hash = await hashPassword(result.value.password);
        
        const id = uuidv4();
        result.value.userId = id;

        delete result.value.confirmPassword;
        result.value.password = hash;

        console.log('CHECKPOINT')
        const newUser = new User(result.value);
        await newUser.save();

        
        console.log(newUser);

        return res.redirect('/login');
    }
    catch (error) {
        console.error('signup-error', error);
        return res.redirect('/register');
    }
}

exports.Login = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            console.log("Cannot find user with corresponding email");
            return res.redirect('/login');
        }

        const user = await User.findOne({email : email, admin: false});

        // Cek if user with that email exist
        if(!user) {
            console.log("Account not found");
            return res.redirect('/login');
        }
        
        let isValid = comparePassword(password, user.password);
        
        if(!isValid) {
            console.log('Invalid Password!');
            return res.redirect('/login');
        }

        // Success
        if(!user.admin) {
            await Pengunjung.insertMany({
                nama: user.nama,
                gender: user.gender,
                status: user.status,
                pengunjungId: uuidv4()
            })

            req.session.userId = user.userId;

            console.log('Logged in!');
            return res.redirect(`/`);
        }
        else{
            console.log('Account not found');;
            return res.redirect('/login');
        }

    }
    catch(error) {
        console.error("Login Error", error);
        return res.redirect('/login');
    }
};

exports.Logout = (req, res, next) => {
    delete req.session.userId;
    return res.redirect('/login');
}