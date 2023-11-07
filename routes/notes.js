const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, readAndRemove } = require('../helpers/utils.js');

// Get all notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Create new note with title, text, and id
notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully`);
    } else {
        res.error('Error in adding note');
    }
});

notes.delete('/:id', (req, res) => {
    const { id } = req.params;

    readFromFile('./db/db.json').then((data) => {
        const allNotes = JSON.parse(data);
        const removeNote = allNotes.findIndex(note => note.id == id);
        allNotes.splice(removeNote, 1);
        readAndRemove(allNotes, './db/db.json');
        res.json(`Note added successfully`);
    });
});

module.exports = notes;
