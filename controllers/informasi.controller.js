const Joi = require('joi');
const {v4: uuidv4} = require('uuid');

const Informasi = require('../models/informasi.model');

const informasiSchema = Joi.object().keys({
    nama_ukm: Joi.string(),
    pengumuman: Joi.string()
})

module.exports.Add = async (req, res, next) => {
    try{
        const result = informasiSchema.validate(req.body);
        
        if(result.error){
            console.log(result.error.message);
            console.error('validate-error', result.error);
            return res.redirect(`/admin/informasi/add`);
        }
        
        const id = uuidv4();
        result.value.informasiId = id

        const newInformasi = new Informasi(result.value);
        await newInformasi.save();

        console.log(newInformasi);
        console.log('Informasi Saved!');
        return res.redirect(`/admin/informasi`);
    }
    catch (error) {
        console.error('creating-error', error);
        return res.redirect(`/admin/informasi/add`);
    }
};

exports.Delete = async (req, res, next) => {
    try{
        console.log(await Informasi.findOne({informasiId: req.body.informasiId}));
        Informasi.deleteOne({informasiId: req.body.informasiId})
        .then(result => {
            console.log(`Informasi ${req.body.informasiId} deleted!`);
            return res.redirect('/admin/informasi');
        })
        .catch(error => console.log(error));
    }
    catch (error) {
        console.error('delete-error', error);
        return res.redirect('/admin/informasi');
    }
}