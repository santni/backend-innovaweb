const express = require('express');
const app = express();
const administradorRouter = require('./src/routes/administradores.routes');
const cursosRouter = require('./src/routes/cursos.routes');
const palavrasChaveRouter = require('./src/routes/palavrasChave.routes');
const authRouter = require('./src/routes/auth.routes'); // Importar o authRouter
require('dotenv').config();
const cors = require('cors')

app.use(cors())
// Middleware para processar JSON
app.use(express.json());

// Rotas para administradores, cursos e palavras-chave
app.use('/administrador', administradorRouter);
app.use('/cursos', cursosRouter);
app.use('/palavras', palavrasChaveRouter);
app.use('/auth', authRouter);

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Configuração da porta
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
