const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

router.get('/projects', async (req, res) => {
    try {
        db.all('SELECT * FROM projects_data;', (err, rows) => {
            if (err) {
                console.log(`Error when receiving project data: ${err}`);
                res.send(`Error when receiving project data: ${err}`);
            }
            else {
                res.send(rows);
                console.log('good');
            }
        })
    }
    catch (err) {
        console.log(`Server error while receiving data: ${err}`);
        res.send(`Server error while receiving data: ${err}`);
    };
});

module.exports = router;