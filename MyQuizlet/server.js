import express from 'express';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const { Pool } = pkg; 

app.use(express.json());
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myquizletdb',
  password: process.env.pass,
  port: 5432,
});

pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL');
    client.release();
  })
  .catch(err => console.error('Connection error', err.stack));

app.get('/', (req, res)=>{
  res.send('Express is running successfully');
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});