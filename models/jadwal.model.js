const mongoose = require('mongoose');

const Jadwal = mongoose.model('Jadwal', new mongoose.Schema({
    nama_ukm: {type:String, required:true},
    jadwal_ukm: {type:String, required:true},
    kegiatan_ukm: {type:String, required:true}
}))