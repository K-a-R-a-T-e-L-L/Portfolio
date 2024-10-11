const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const dotenv = require('dotenv');
dotenv.config();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// db.run(`CREATE TABLE projects_data
//     (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, name_ru TEXT NOT NULL, link TEXT NOT NULL, img BLOB NOT NULL, info TEXT NOT NULL, info_ru TEXT NOT NULL)`);
// db.run('DELETE FROM projects_data');

app.use(express.json());
app.use(cors());

app.get('/adding', async (req, res) => {
    const data = req.body;
    try {
        db.run('INSERT INTO projects_data (name, name_ru, link, img, info, info_ru) VALUES(?, ?, ?, ?, ?, ?);',
            [data.name, data.name_ru, data.link, data.img, data.info, data.info_ru], function (err) {
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
                console.log(rows);
            }
        })
    }
    catch (err) {
        console.log(`Server error when adding data: ${err}`);
        res.send(`Server error when adding data: ${err}`);
    };
});

app.get('/projects', async (req, res) => {
    try {
        db.all('SELECT * FROM projects_data;', (err, rows) => {
            if (err) {
                console.log(`Error when receiving project data: ${err}`);
                res.send(`Error when receiving project data: ${err}`);
            }
            else {
                res.send(rows);
                console.table(rows);
            }
        })
    }
    catch (err) {
        console.log(`Server error while receiving data: ${err}`);
        res.send(`Server error while receiving data: ${err}`);
    };
});

app.listen(port, () => console.log('Server started'));