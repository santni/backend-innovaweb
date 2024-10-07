const pool = require('../config/db.config'); 

const getUserByEmail = async (req, res) => {
    try {
        const { email, super_adm } = req.params;

        if (!super_adm) {
            return res.status(403).send({ message: 'Acesso negado. Somente usuários super podem criar administradores.' });
        }

        const user = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        return user.rowCount > 0 
            ? res.status(200).send(user.rows[0]) 
            : res.status(200).send({ message: 'User not found' });
    } catch (e) {
        console.log('Could not GET user by email, server error', e);
        return res.status(500).send({ message: 'Could not HTTP GET' }); 
    }
}

const getAdm = async (req, res) => {
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
};

const createAdm = async (req, res) => {
    try {
        const { nome, login, senha, super_adm } = req.body;

        // Verifica se o usuário é "super"
        if (!super_adm) {
            return res.status(403).send({ message: 'Acesso negado. Somente usuários super podem criar administradores.' });
        }

        // Verifica se os campos obrigatórios foram preenchidos
        if (!nome || !login || !senha) {
            return res.status(400).send({ message: 'Preencha todos os campos' });
        }

        // Insere o novo administrador no banco de dados
        const result = await pool.query(
            'INSERT INTO administrador (nome, login, senha) VALUES ($1, $2, $3) RETURNING *',
            [nome, login, senha]
        );

        if (result.rowCount > 0) {
            return res.status(201).send({ message: 'Administrador cadastrado com sucesso' });
        } else {
            return res.status(400).send({ message: 'Erro ao cadastrar o administrador' });
        }
    } catch (error) {
        console.error('Erro ao criar administrador:', error.message);
        return res.status(500).send({ message: 'Não foi possível cadastrar o administrador' });
    }
};


const updateAdm = async (req, res) => {
    const id = req.params.id;
    const { nome, login, senha } = req.body;

    const query = `
        UPDATE administrador 
        SET nome = $1, login = $2, senha = $3
        WHERE id_administrador = $4
    `;
    const values = [nome, login, senha, id];

    try {
        await pool.query(query, values);
        res.send('Administrador atualizado com sucesso');
    } catch (err) {
        console.error('Erro ao atualizar administrador:', err);
        res.status(500).send('Erro ao atualizar administrador');
    }
};

const deleteAdm = async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM administrador WHERE id_administrador = $1';

    try {
        await pool.query(query, [id]);
        res.send('Administrador deletado com sucesso');
    } catch (err) {
        console.error('Erro ao deletar administrador:', err);
        res.status(500).send('Erro ao deletar administrador');
    }
};

module.exports = {
    getUserByEmail,
    getAdm,
    createAdm,
    updateAdm,
    deleteAdm,
};