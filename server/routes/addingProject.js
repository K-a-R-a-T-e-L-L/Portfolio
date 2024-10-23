const express = require('express');
const { upload } = require('../middleware/multer');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

router.post('/adding', upload.array('img'), async (req, res) => {
    const {name, name_ru, link, info, info_ru} = req.body;
    const img = req.files;
    const data = {name, name_ru, link, img, info, info_ru};
    
    try {
        db.run('INSERT INTO projects_data (name, name_ru, link, img, info, info_ru) VALUES(?, ?, ?, ?, ?, ?);',
            [data.name, data.name_ru, data.link, JSON.stringify(data.img), data.info, data.info_ru], function (err) {
                if (err) {
                    console.log(`Error writing data: ${err}`);
                    res.send(`Error writing data: ${err}`);
                };
            });
        db.all('SELECT * FROM projects_data;', (err, rows) => {
            if (err) {
                console.log(`Error in data extraction: ${err}`);
                res.send(`Error in data extraction: ${err}`);
            }
            else {
                res.send(rows);
                console.log('good');
            }
        })
    }
    catch (err) {
        console.log(`Server error when adding data: ${err}`);
        res.send(`Server error when adding data: ${err}`);
    };
});

module.exports = router;