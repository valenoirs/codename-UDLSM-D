const express = require('express');
const router = express.Router();
const PertanyaanController = require('../controllers/pertanyaan.controller');
const cleanBody = require('../utils/cleanBody');

router.post('/add/:id', cleanBody, PertanyaanController.Add)

router.post('/reply/:email', cleanBody, PertanyaanController.Reply)

router.delete('/delete', PertanyaanController.Delete)

module.exports = router;