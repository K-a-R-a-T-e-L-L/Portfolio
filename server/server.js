const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;
const dotenv = require('dotenv');
dotenv.config();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// db.run(`CREATE TABLE projects_data
    // (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, link TEXT NOT NULL, img BLOB NOT NULL, info TEXT NOT NULL)`);
// db.run('DELETE FROM projects_data');

app.use(express.json());
app.use(cors());

app.get('/projects', async () => { });

app.listen(port, () => console.log('Server started'));