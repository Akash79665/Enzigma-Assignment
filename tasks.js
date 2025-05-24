const express = require('express');
const router = express.Router();
const db = require('./db/db');

router.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

router.post('/task', (req, res) => {
    const { userid, username, status, due_date, priority,comments } = req.body;
    const sql = 'INSERT INTO users (userid, username, status, due_date, priority,comments) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [userid, username, status, due_date, priority,comments], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Task Added successfully' });
    });
});

// Update a subscription
router.put('/task/:id', (req, res) => {
    const { userid, username, status, due_date, priority,comments  } = req.body;
    const sql = 'UPDATE users SET username = ?, status = ?, due_date = ?, priority = ?, comments = ? WHERE userid = ?';
    db.query(sql, [userid, username, status, due_date, priority,comments , req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Task updated successfully' });
    });
});

// Delete a subscription
router.delete('/task/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE userid = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Task deleted successfully' });
    });
});

module.exports = router;


