import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// API Routes
app.use('/api', apiRouter);
// Fallback Route
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.url} not found.` });
});
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  MANAK AI Backend Server running on port ${PORT}`);
    console.log(`  Mode: DEMO GROUNDED RAG MODE (Zero API dependency)`);
    console.log(`  Health check: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
});
export default app;
