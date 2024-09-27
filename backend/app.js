require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const scoreRoutes = require("./routes/Scores");

const app = express();
connectDB();  // Conectar a MongoDB

// Middleware para JSON y CORS
app.use(express.json());
app.use(cors({
    origin: 'https://boxingscore.framer.website', // Tu app React
}));

// Rutas
app.use("/api/scores", scoreRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
