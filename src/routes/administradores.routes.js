const express = require('express');
const router = express.Router();
const { getAdm, createAdm, updateAdm, deleteAdm } = require('../controllers/administradores.controllers'); 

router.get('/administradores', getAdm);
router.post('/administradores', createAdm);
router.put('/administradores/:id', updateAdm);
router.delete('/administradores/:id', deleteAdm);

module.exports = router;
