const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

router.get('/projects', async (req, res) => {
    try {
        db.all('SELECT * FROM projects_data;', (err, rows) => {
            if (err) {
                res.status(500).send(err);
            }
                res.status(200).send(rows);
        })
    }
    catch (err) {
        res.status(500).send(err);
    };
});

module.exports = router;