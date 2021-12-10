const Joi = require('joi');
const {v4: uuidv4} = require('uuid');

const UKM = require('../models/ukm.model');
const Anggota = require('../models/anggota.model');
const Informasi = require('../models/informasi.model');

const UKMSchema = Joi.object().keys({
    nama: Joi.string(),
    jenis: Joi.string(),
    koordinator: Joi.string(),
    fakultas: Joi.string(),
    program_studi: Joi.string(),
    semester: Joi.string(),
    ukmImg: Joi.string(),
    koordinatorImg: Joi.string()
})

module.exports.Add = async (req, res, next) => {
    try{
        const result = UKMSchema.validate(req.body);
        if(result.error){
            console.log(result.error.message);
            console.error('validate-error', result.error);
            return res.redirect('/admin/ukm/add');
        }

        const id = uuidv4();
        result.value.ukmId = id;

        const newUKM = new UKM(result.value);
        await newUKM.save();

        console.log(newUKM);
        console.log('UKM Added!');
        return res.redirect('/admin/ukm');
    }
    catch (error) {
        console.error('creating-error', error);
        return res.redirect('/admin/ukm/add');
    }
};

exports.Delete = async (req, res, next) => {
    try{
        const dataUKM = await UKM.findOne({ukmId: req.body.ukmId})
        console.log(dataUKM);
        
        const dataAnggota = await Anggota.find({ukm: dataUKM.nama});
        console.log(dataAnggota);

        await UKM.deleteOne({ukmId: req.body.ukmId})
        .then(result => {
            console.log(`UKM ${req.body.ukmId} deleted!`);
        })
        .catch(error => console.log(error));
        
        await Informasi.deleteMany({nama_ukm: dataUKM.nama})
        .then(result => {
            console.log(`Informasi ${dataUKM.nama} deleted!`);
        })
        .catch(error => console.log(error));

        await Anggota.deleteMany({ukm: dataUKM.nama})
        .then(result => {
            console.log(`Anggota ${dataUKM.nama} deleted!`);
            return res.redirect('/admin/ukm');
        })
        .catch(error => console.log(error));
    }
    catch (error){
        console.error('delete-error', error);
        return res.redirect('/admin/ukm')
    }
}