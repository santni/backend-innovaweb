const express = require('express');
const { types } = require('pg');

const AdmSchema = new express.Schema ({

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },

    password: {
        type: String,
        unique: true,
        required: true,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Adm = express.model('Adm', userSchema);

module.exports = Adm;