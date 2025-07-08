import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import usersRoute from './routes/users.js';
import flashcardSetsRoute from './routes/flashcardSets.js';
import flashcardRoute from './routes/flashcards.js'
import pool from './db.js';

dotenv.config();

const app = express();

//use cors to allow access from different domains
app.use(cors());
app.use(express.json());

pool.connect().then(client => {
    console.log('Connected to PostgreSQL');
    client.release();
}).catch(err => console.error('Connection error', err.stack));

// Routes
app.use('/api/users', usersRoute);
app.use('/api/flashcard-sets', flashcardSetsRoute);
app.use('/api/flashcards', flashcardRoute);

app.get('/', (req, res) => {
  res.send('Express is running successfully');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
