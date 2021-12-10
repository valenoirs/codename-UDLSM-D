const Joi = require('joi');
const {v4: uuidv4} = require('uuid');
const sendMail = require('../utils/mailer');

const Pertanyaan = require('../models/pertanyaan.model');
const User = require('../models/user.model');


const pertanyaanSchema = Joi.object().keys({
    text: Joi.string(),
})

module.exports.Add = async (req, res, next) => {
    try{
        
        const result = pertanyaanSchema.validate(req.body);
        
        if(result.error){
            console.log(result.error.message);
            console.error('validate-error', result.error);
            return res.redirect(`/`);
        }
        
        const user = await User.findOne({userId : req.params.id});

        const data = {
            nama: user.nama,
            email: user.email,
            text: req.body.text,
            balasan: "",
            pertanyaanId: uuidv4()
        }

        const newPertanyaan = new Pertanyaan(data);
        await newPertanyaan.save();

        console.log(newPertanyaan);
        console.log('Pertanyaan Saved!');
        return res.redirect(`/`);
    }
    catch (error) {
        console.error('creating-error', error);
        return res.redirect(`/`);
    }
};

exports.Delete = async (req, res, next) => {
    try{
        console.log(await Pertanyaan.findOne({pertanyaanId: req.body.pertanyaanId}));
        await Pertanyaan.deleteOne({pertanyaanId: req.body.pertanyaanId})
        .then(result => {
            console.log(`Pertanyaan ${req.body.pertanyaanId} deleted!`)
            return res.redirect('/admin/pertanyaan');
        })
        .catch(error => console.log(error));
    }
    catch (error){
        console.error('delete-error', error);
        return res.redirect('/admin/pertanyaan')
    }   
}

exports.Reply = async (req, res, next) => {
    console.log(req.params.email);
    console.log(req.body);
    const pertanyaan = await Pertanyaan.findOne({email: req.params.email});
    console.log(pertanyaan);
    try{
        await Pertanyaan.updateOne({email: req.params.email}, {
            $set: {balasan: req.body.balasan}
        });
        await sendMail(req.params.email, req.body.balasan);
        console.log('Pesan Balasan Terkirim');
        return res.redirect('/admin/pertanyaan');
    }
    catch (error){
        console.error('sending-email-error', error);
        return res.redirect(`/admin/balasan/${req.body.email}`);
    }
}