const Joi = require('joi');
const Anggota = require('../models/anggota.model');

const {v4: uuidv4} = require('uuid');

const anggotaSchema = Joi.object().keys({
    nama: Joi.string(),
    usia: Joi.string(),
    fakultas: Joi.string(),
    ukm: Joi.string()
})

module.exports.Add = async (req, res, next) => {
    try{
        const result = anggotaSchema.validate(req.body);
        if(result.error){
            console.log(result.error.message);
            console.error('validate-error', result.error);
            return res.redirect('/admin/anggota/add');
        }

        const anggota = await Anggota.findOne({nama : result.value.nama});
    
        if(anggota){
            console.log('UKM with the same name found!');
            return res.redirect('/admin/anggota/add');
        }

        const id = uuidv4();
        result.value.anggotaId = id;

        const newAnggota = new Anggota(result.value);
        await newAnggota.save();

        console.log(newAnggota);
        console.log('Anggota Saved!');
        return res.redirect('/admin/anggota');
    }
    catch (error) {
        console.error('creating-error', error);
        return res.redirect('/admin/anggota/add');
    }
};

exports.Delete = async (req, res, next) => {
    try{
        console.log(await Anggota.findOne({anggotaId: req.body.anggotaId}));
        await Anggota.deleteOne({anggotaId: req.body.anggotaId})
        .then(result => {
            console.log(`Anggota ${req.body.anggotaId} deleted!`);
            return res.redirect('/admin/anggota');
        })
        .catch(error => console.log(error));
    }
    catch (error) {
        console.error('delete-error', error);
        return res.redirect('/admin/anggota');
    }   
}