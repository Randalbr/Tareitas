const express = require('express');
const cors = require('cors');
const tareitas = require('./routes/tareitas.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tareitas', tareitas);

module.exports = app;
