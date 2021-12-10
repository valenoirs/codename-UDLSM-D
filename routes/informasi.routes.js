const express = require('express');
const router = express.Router();
const InformasiController = require('../controllers/informasi.controller');
const cleanBody = require('../utils/cleanBody');

router.post('/add', cleanBody, InformasiController.Add);
router.delete('/delete', InformasiController.Delete);

module.exports = router;