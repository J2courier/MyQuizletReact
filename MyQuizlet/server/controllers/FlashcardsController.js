import pool from "../db.js";

export async function createFlashcard(req, res) {
    try {
        const {set_id, term, definition} = req.body;
        
        if (!set_id || !term || !definition) {
            return res.status(400).json({error: "Missing requirements fields"});
        }

        const rs = await pool.query(
            "INSERT INTO flashcards (set_id, term, definition) VALUES ($1, $2, $3) RETURNING *",  
            [set_id, term, definition]
        );


        res.status(201).json(rs.rows[0]);
    } catch (err){
        console.error("createFlashcard Error", err);
        res.status(500).send("server error")
    }
}