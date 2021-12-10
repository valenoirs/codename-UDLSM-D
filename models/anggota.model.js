const mongoose = require('mongoose');

const Anggota = mongoose.model('Anggota', new mongoose.Schema({
    nama: {type:String, required:true},
    usia: {type:String, required:true},
    fakultas: {type:String, required:true},
    ukm: {type:String, required:true},
    anggotaId: {type:String, required:true, unique: true}
}));

module.exports = Anggota;