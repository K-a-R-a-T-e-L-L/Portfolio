const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

router.post('/delete', async (req, res) => {
    const { idProject, oneValue, twoValue } = req.body;    
    try {
        if (oneValue === '111' && twoValue === '333') {
            db.run('DELETE FROM projects_data WHERE id = ?;', [idProject], async (err, rows) => {
                if (err) {
                    console.log(err);
                    res.send(err)
                }
                else {
                    console.log(rows);
                    res.send(true);
                }
            });
        }
        else {
            res.send(false)
        };
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

module.exports = router;