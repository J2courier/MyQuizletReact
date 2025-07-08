import pool from '../db.js';//.js is important because the node will not recognize the import or find rather

export async function createFlashcardSets(req, res) {
    const { title, description } = req.body;

    try {
        const rs = await pool.query(
            'INSERT INTO flashcard_sets(user_id, title, description) VALUES ($1, $2, $3) RETURNING *', [1, title, description]
        );
        res.status(201).json(rs.rows[0]);
    } catch (e) {
        console.error('Error creating flashcard set', e);
        res.status(500).send('server error')
    }
}

export async function deleteSet(req, res) {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM flashcard_sets WHERE id = $1", [id]);
        res.sendStatus(204); 
    } catch (err) {
        res.status(500).send("Server error");
    }
}