const express = require('express');

const Adm = require('../models/administrador');

const router = express.Router();

router.post('/register', async(req, res) => {
  try {
    const adm = await Adm.create(req.body);

    return res.send({adm});
  } catch (err) {
     return res.status(400).send({ error: 'Registration failed'});
  }  
});

module.exports = app => app.use('/auth', router);