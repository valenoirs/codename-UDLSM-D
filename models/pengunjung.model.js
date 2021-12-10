const mongoose = require('mongoose');

const Pengunjung = mongoose.model('Pengunjung', new mongoose.Schema({
    nama: {type:String, required:true},
    gender: {type:String, required:true},
    status: {type:String, required:true},
    pengunjungId: {type:String, required:true}
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}));

module.exports = Pengunjung;