const express = require('express');
const cursoController = require('./src/controllers/cursos.controllers'); // Importa o controller

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Define as rotas usando os métodos do controller
app.get('/cursos', cursoController.getCursos);
app.post('/cursos', cursoController.createCurso);
app.put('/cursos/:id', cursoController.updateCurso);
app.delete('/cursos/:id', cursoController.deleteCurso);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 👨‍🏫👨‍🎓`);
});
