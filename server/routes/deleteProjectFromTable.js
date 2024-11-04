const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
require('dotenv').config();

router.post('/delete', async (req, res) => {
    const { idProject, oneValue, twoValue } = req.body;
    try {
        if (oneValue === process.env.VERIFICATION_CODE_ONE && twoValue === process.env.VERIFICATION_CODE_TWO) {
            db.run('DELETE FROM projects_data WHERE id = ?;', [idProject], async (err, rows) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(true);
            });
        }
        else {
            res.status(401).send(false)
        };
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;