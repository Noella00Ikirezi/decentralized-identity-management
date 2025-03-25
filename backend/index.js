// index.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import documentsRoutes from './routes/documents.js';
import profileRoutes from './routes/profile.js';
import shareRoutes from './routes/share.js';

dotenv.config();

const app = express();

app.use(cors()); // This will allow all origins. You may want to restrict it later.
app.use(bodyParser.json());

// Routes
app.use('/api/documents', documentsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/share', shareRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Backend started on http://localhost:${process.env.PORT || 5000}`);
});
