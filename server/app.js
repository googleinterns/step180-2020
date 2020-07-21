import express from 'express';
import api from './api';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api', api);

export default app;
