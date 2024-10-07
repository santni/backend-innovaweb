const express = require('express');
const app = express();
const administradorRouter = require('./src/routes/administradores.routes');
const cursosRouter = require('./src/routes/cursos.routes');
const palavrasChaveRouter = require('./src/routes/palavrasChave.routes');
require('dotenv').config();

app.use(express.json());

// Rotas para administradores, cursos e palavras-chave
app.use('/administrador', administradorRouter);
app.use('/cursos', cursosRouter);
app.use('/palavras', palavrasChaveRouter);

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});