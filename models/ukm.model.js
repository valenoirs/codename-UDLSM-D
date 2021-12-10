const mongoose = require('mongoose');

const UKM = mongoose.model('UKM', new mongoose.Schema({
    nama: {type:String, required: true, unique: true},
    jenis: {type:String, required: true},
    koordinator: {type:String, required: true},
    fakultas: {type: String, required: true},
    program_studi: {type: String, required: true},
    semester: {type: String, required: true},
    ukmId: {type:String, required:true, unique:true},
    ukmImg: {type:String, required: true},
    koordinatorImg: {type:String, required: true}
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}));

module.exports = UKM;