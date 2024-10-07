const express = require('express');
const router = express.Router();
const {
    getPalavrasChave,
    createPalavraChave,
    updatePalavraChave,
    deletePalavraChave,
    getCursosPorPalavraChave
} = require('../controllers/palavrasChave.controllers'); 


router.get('/', getPalavrasChave);
router.post('/', createPalavraChave);
router.put('/:id', updatePalavraChave);
router.delete('/:id', deletePalavraChave);
router.get('/cursos/:palavras', getCursosPorPalavraChave);

module.exports = router;
