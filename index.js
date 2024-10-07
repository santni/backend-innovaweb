const express= require('express');
const app = express();
const administradorRouter = require ('./src/routes/administradores.routes');
const cursosRouter = require  ('./src/routes/cursos.routes');
const palavrasChaveRouter = require ('./src/routes/palavrasChave.routes');
require('dotenv').config();

app.use(express.json());

//rotas para juncao.
app.use('/administrador', administradorRouter);
app.use('/cursos', cursosRouter);
app.use('/palavrasChave', palavrasChaveRouter);

//verificar se ta rodando
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

//conf para pegar a porta e rodar 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});