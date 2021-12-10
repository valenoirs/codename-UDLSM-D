const mongoose = require('mongoose');

const Informasi = mongoose.model('Informasi', new mongoose.Schema({
    nama_ukm: {type: String, required: true},
    pengumuman: {type: String, required: true},
    informasiId: {type: String, required: true}
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}))

module.exports = Informasi;