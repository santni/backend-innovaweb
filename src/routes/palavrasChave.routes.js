const express = require('express');
const router = express.Router();
const {
    getPalavrasChave,
    createPalavraChave,
    updatePalavraChave,
    deletePalavraChave,
    getCursosPorPalavraChave
} = require('../controllers/palavrasChave.controllers'); 


router.get('/palavras-chave', getPalavrasChave);
router.post('/palavras-chave', createPalavraChave);
router.put('/palavras-chave/:id', updatePalavraChave);
router.delete('/palavras-chave/:id', deletePalavraChave);
router.get('/cursos/palavra-chave/:palavras', getCursosPorPalavraChave);

module.exports = router;
