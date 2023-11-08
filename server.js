const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(clog);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '/public/notes.html')));

// Wildcard Route
// app.get('/*', (req, res) =>
// res.status(404).send('<h1>404! Page not found</h1>')
// );

app.listen(PORT, () => console.log(`App is listening at: http://localhost:${PORT}`));