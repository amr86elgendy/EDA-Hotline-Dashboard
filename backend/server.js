import express from 'express';
import path from 'path';
import connectDB from './db.js';
import _env from 'dotenv';
_env.config();

const app = express();

// IMPORT ROUTES
import authRoutes from './routes/auth.js';
import problemRoutes from './routes/problem.js';

app.use(express.json());
app.use(authRoutes);
app.use(problemRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

connectDB();
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));
