const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');
const express = require('express');

const app = express();

const PORT = process.env.port || 80;

app.use(express.static('public'));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        let database = JSON.parse(data);
        res.json(database)
    });   
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body
    db.push(newNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db)
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
});

app.listen(PORT, () =>
    console.log(`App listening on ${PORT}`)
);