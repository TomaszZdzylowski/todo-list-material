const express = require('express');
const app = express();
const mongooes = require('mongoose');
require('dotenv/config');
const cors = require('cors');

app.use(cors());

const tasksRoute = require('./routes/tasks');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/tasks', tasksRoute);

mongooes.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to DB');
})

app.listen(3000);