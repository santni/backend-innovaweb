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

// CRUD para Cursos
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
      titulo, modalidade, carga_horaria, nivel, descricao, descricao_requisitos, programacao, modalidade_aula, metodologia_ensino, idade, turnos, status, imagem,
    } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!titulo || !modalidade || !carga_horaria || !nivel || !descricao || !descricao_requisitos || !programacao || !modalidade_aula || !metodologia_ensino || !idade || !turnos || !status || !imagem) {
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

// CRUD para Administradores
app.get('/administrador', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM administrador');
    res.json({
      total: result.rowCount,
      administrador: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter administrador:', error);
    res.status(500).send('Erro ao obter administrador');
  }
});

app.post('/administrador', async (req, res) => {
  
  try {
    const {
      nome, 
      login, 
      senha,
      super_adm
    } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!nome || !login || !senha) {
      res.status(400).send({ message: 'Preencha todos os campos' });
      return;
    }

    // Inserção no banco de dados
    const result = await pool.query(
      'INSERT INTO administrador (nome, login, senha, super) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        nome, 
        login,
        senha,
        super_adm
      ]
    );
    if (result.rowCount > 0) {
      res.status(201).send({ message: 'administrador cadastrado com sucesso' });
    } else {
      res.status(400).send({ message: 'Erro ao cadastrar o administrador' });
    }
  } catch (e) {
    console.error('Erro ao criar administrador:', e.message, e.stack);
    res.status(500).send({ mensagem: 'Não foi possível cadastrar o administrador' });
  }
});

// CRUD para Palavras-Chaves
app.get('/palavras_chaves', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM palavras_chaves');
    res.json({
      total: result.rowCount,
      palavras_chaves: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter palavra_chave:', error);
    res.status(500).send('Erro ao obter palavra_chave');
  }
});

app.post('/palavras_chaves', async (req, res) => {
  console.log("Teste");
  
  try {
    const { palavras } = req.body;

    // Verifica se todos os campos estão preenchidos
    if (!palavras) {
      res.status(400).send({ message: 'Preencha todos os campos' });
      return;
    }

    // Inserção no banco de dados
    const result = await pool.query(
      'INSERT INTO palavras_chaves (palavras) VALUES ($1) RETURNING *',
      [palavras]  // Correção feita aqui
    );

    if (result.rowCount > 0) {
      res.status(201).send({ message: 'palavra-chave cadastrada com sucesso' });
    } else {
      res.status(400).send({ message: 'Erro ao cadastrar a palavra-chave' });
    }
  } catch (e) {
    console.error('Erro ao criar palavra-chave:', e.message, e.stack);
    res.status(500).send({ mensagem: 'Não foi possível cadastrar a palavra-chave' });
  }
});

app.put('/palavras_chaves/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const { palavras } = req.body;  // Corrigido para usar 'palavras'

  const query = `
    UPDATE palavras_chaves SET palavras = $1 WHERE id_palavrasChaves = $2
  `;
  
  const values = [
    palavras,  // Corrigido para usar 'palavras'
    id
  ];

  try {
    await pool.query(query, values);
    res.send('palavra-chave atualizada com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar palavra-chave:', err);
    res.status(500).send('Erro ao atualizar palavra-chave');
  }
});

app.delete('/palavras_chaves/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM palavras_chaves WHERE id_palavrasChaves = $1';

  try {
    await pool.query(query, [id]);
    res.send('palavra-chave deletada com sucesso');
  } catch (err) {
    console.error('Erro ao deletar palavra-chave:', err);
    res.status(500).send('Erro ao deletar palavra-chave');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 👨‍🏫👨‍🎓`);
});
