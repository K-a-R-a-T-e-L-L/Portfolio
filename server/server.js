const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const port = 4000;
const dotenv = require('dotenv');
dotenv.config();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const AddingProjectRouter = require('./routes/addingProject');
const RequestProjectsRouter = require('./routes/requestProjects');

// db.run(`CREATE TABLE projects_data
//     (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, name_ru TEXT NOT NULL, link TEXT NOT NULL, img BLOB NOT NULL, info TEXT NOT NULL, info_ru TEXT NOT NULL)`);
// db.run('DELETE FROM projects_data');

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(AddingProjectRouter);
app.use(RequestProjectsRouter);

app.listen(port, () => console.log('Server started'));