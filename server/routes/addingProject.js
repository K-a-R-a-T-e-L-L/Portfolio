const express = require('express');
const { upload } = require('../middleware/multer');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

router.post('/adding', upload.array('img'), async (req, res) => {
    const { name, name_ru, link, info, info_ru } = req.body;
    const img = req.files;
    const data = { name, name_ru, link, img, info, info_ru };

    try {
        db.run('INSERT INTO projects_data (name, name_ru, link, img, info, info_ru) VALUES(?, ?, ?, ?, ?, ?);',
            [data.name, data.name_ru, data.link, JSON.stringify(data.img), data.info, data.info_ru], function (err) {
                if (err) {
                    res.status(500).send(err);
                };
                res.status(200).send('Adding data was successful');
            });
    }
    catch (err) {
        res.status(500).send(err);
    };
});

module.exports = router;