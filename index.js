const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',  
  database: 'innovaweb',
  password: 'ds564',
  port: 7777, 
});

app.get('/cursos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cursos');
    res.json({
      total: result.rowCount,
      cursos: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter cursos:', error);
    res.status(500).send('Erro ao obter cursos');
  }
});

app.post('/cursos', async (req, res) => {
  console.log("Teste");
  
  try {
    const {
      titulo, modalidade, carga_horaria,nivel,descricao,descricao_requisitos,programacao,  modalidade_aula,    metodologia_ensino,  idade,    turnos,    status,   imagem,
    } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (
      !titulo ||
      !modalidade ||
      !carga_horaria ||
      !nivel ||
      !descricao ||
      !descricao_requisitos ||
      !programacao ||
      !modalidade_aula ||
      !metodologia_ensino ||
      !idade ||
      !turnos ||
      !status ||
      !imagem
    ) {
      res.status(400).send({ message: 'Preencha todos os campos' });
      return;
    }

    // Inserção no banco de dados
    const result = await pool.query(
      'INSERT INTO cursos (titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *',
      [
        titulo,
        modalidade,
        carga_horaria,
        nivel,
        descricao,
        descricao_requisitos,
        programacao,
        modalidade_aula,
        metodologia_ensino,
        idade,
        turnos,
        status,
        imagem,
      ]
    );

    
    if (result.rowCount > 0) {
      res.status(201).send({ message: 'Curso cadastrado com sucesso' });
    } else {
      res.status(400).send({ message: 'Erro ao cadastrar o curso' });
    }
  } catch (e) {
    console.error('Erro ao criar curso:', e.message, e.stack);
    res.status(500).send({ mensagem: 'Não foi possível cadastrar o curso' });
  }
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta ${PORT}');
});