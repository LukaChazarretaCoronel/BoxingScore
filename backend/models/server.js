require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require('../config/db'); // Nuevo import para PostgreSQL
const scoresRouter = require('../routes/Scores');
const app = express();

// Conectar a PostgreSQL
connectDB();

// Middleware para permitir JSON y CORS
app.use(express.json());
app.use(cors({
    origin: 'https://boxingscore.framer.website',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Usar el router de Scores
app.use('/api/scores', scoresRouter);

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error en el servidor" });
});

// Escuchar en el puerto 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
