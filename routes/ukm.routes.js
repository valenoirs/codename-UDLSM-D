const express = require('express');
const router = express.Router();
const UKMController = require('../controllers/ukm.controller');
const cleanBody = require('../utils/cleanBody');

router.post('/add', cleanBody, UKMController.Add)
router.delete('/delete', UKMController.Delete)

module.exports = router;