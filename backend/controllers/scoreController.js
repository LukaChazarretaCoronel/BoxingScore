const { pool } = require('../config/db'); // Importar la conexión a PostgreSQL

// Agregar puntaje
const addScore = async (req, res) => {
    try {
        const { fighterLeft, fighterRight, rounds, scoresLeft, scoresRight, winner } = req.body;
        const result = await pool.query(
            'INSERT INTO scores (fighter_left, fighter_right, rounds, scores_left, scores_right, winner) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [fighterLeft, fighterRight, rounds, scoresLeft, scoresRight, winner]
        );
        res.status(200).json({ message: "Puntajes guardados con éxito", newScore: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: "Error al guardar el puntaje" });
    }
};

// Obtener todos los puntajes
const getAllScores = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM scores ORDER BY date DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los puntajes" });
    }
};

module.exports = { addScore, getAllScores };