const express = require('express');
const router = express.Router();
const AnggotaController = require('../controllers/anggota.controller');
const cleanBody = require('../utils/cleanBody');

router.post('/add', cleanBody, AnggotaController.Add)
router.delete('/delete', AnggotaController.Delete)

module.exports = router;