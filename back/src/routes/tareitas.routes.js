const express = require('express');
const router = express.Router();
const tareitasController = require('../controllers/tareitas.controllers');

router.get('/', tareitasController.getTareitas);
router.post('/', tareitasController.createTareitas);
router.delete('/:codigo', tareitasController.deleteTareita);

module.exports = router;
