// backend/routes/Scores.js
const express = require('express');
const router = express.Router();
const { pool } = require('../config/db'); // Importar la conexión a PostgreSQL

// Ruta para agregar un nuevo puntaje
router.post('/add', async (req, res) => {
    const { fighterLeft, fighterRight, rounds, scoresLeft, scoresRight, winner } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO scores (fighter_left, fighter_right, rounds, scores_left, scores_right, winner) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [fighterLeft, fighterRight, rounds, scoresLeft, scoresRight, winner]
        );
        res.status(201).json({ message: 'Score saved successfully', score: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message }); 
    }
});

// Ruta para obtener todos los puntajes
router.get('/all', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM scores ORDER BY date DESC');
        console.log(result.rows) // Verifica los datos enviados
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;    