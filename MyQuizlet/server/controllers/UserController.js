import pool from "../db.js";

export async function getUsers(req, res) {
    try {
        const rs = await pool.query('SELECT username FROM users WHERE id = 1');
        res.json(rs.rows);
    } catch (e) {
        console.error("getUsers Error ", e);
        res.status(500).send("server error")
    }
}