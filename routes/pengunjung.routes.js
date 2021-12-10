const express = require('express');
const router = express.Router();
const PengunjungController = require('../controllers/pengunjung.controller');

router.delete('/delete', PengunjungController.Delete);

module.exports = router;