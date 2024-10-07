const express = require('express');
const router = express.Router();
const { getAdm, createAdm, updateAdm, deleteAdm } = require('../controllers/administradores.controllers'); 

router.get('/', getAdm);
router.post('/', createAdm);
router.put('/:id', updateAdm);
router.delete('/:id', deleteAdm);

module.exports = router;
