const mongoose = require('mongoose');

const Pertanyaan = mongoose.model('Pertanyaan', new mongoose.Schema({
    nama: {type:String, required: true},
    email: {type:String, required:true},
    text: {type:String, required:true},
    balasan: {type:String},
    pertanyaanId: {type: String, required: true, unique: true}
}))

module.exports = Pertanyaan;