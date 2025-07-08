import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myquizletdb',
  password: process.env.pass, 
  port: 5432,
});

export default pool;
