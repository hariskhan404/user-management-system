const db = require('../db');

exports.getAllUsers = async (req, res) => {
    try {
        const queryText = 'SELECT * FROM users';
        const { rows } = await db.query(queryText);
        res.status(200).json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const queryText = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await db.query(queryText, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;

    try {
        const queryText = 'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *';
        const { rows } = await db.query(queryText, [username, password, userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const queryText = 'DELETE FROM users WHERE id = $1';
        await db.query(queryText, [userId]);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
