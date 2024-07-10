const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../db");

const generateToken = (userId) => {
    return jwt.sign({ userId }, 'your_jwt_secret', { expiresIn: '1h' });
    };

exports.signup = async (req, res) => {
    const {username, password } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 12);
        const queryText = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *';
        const { rows } = await db.query(queryText, [username, hashedPassword]);
        const token = generateToken(rows[0].id);
        res.status(201).json({ token });
      } catch (err) {
        res.status(500).json({ error: err.message });
      } 
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try{
        const queryText = 'SELECT * FROM users WHERE username = $1';
        const { rows } = await db.query(queryText, [username]);

        if (rows.length === 0) { 
            return res.status(401).json({ error: 'Authentication failed. User not found.' });
        }

        const user = row[0]
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
             return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
        }

        const token = generateToken(user.id);
        res.status(200).json({ token });
      } catch (err) {
        res.status(500).jason({ error: err.message });
      }
};
