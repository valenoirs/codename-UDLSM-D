const Pengunjung = require('../models/pengunjung.model');

module.exports.Delete = async (req, res, next) => {
    try{
        console.log(await Pengunjung.findOne({pengunjungId: req.body.pengunjungId}));
        await Pengunjung.deleteOne({pengunjungId: req.body.pengunjungId})
        .then(result => {
            console.log(`Pengunjung ${req.body.pengunjungId} deleted!`);
            return res.redirect('/admin/pengunjung');
        })
        .catch(error => console.log(error));
    }
    catch (error) {
        console.error('delete-error', error);
        return res.redirect('/admin/pengunjung');
    }
}