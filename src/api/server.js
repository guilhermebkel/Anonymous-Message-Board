const express = require('express');
const server = express();
const { config } = require('dotenv');
const { join } = require('path')
const databaseConnection = require('./helpers/db');
const cors = require('./helpers/cors');
const helmet = require('./helpers/helmet');

const dotenvPath = join(__dirname, '..', './config', '.env');
config({
  path: dotenvPath,
})

databaseConnection(process.env.POSTGRES_URI)
.then((data) => console.log('Connected to database!'))
.catch((error) => console.error('Error when trying to connect to database'));

cors(server);

helmet(server);

server.listen(process.env.PORT, () => {
    console.log("Server listening on port", process.env.PORT);
});

server.get("/", (req, res) => {
    res.json({"status": "Express server is running!"});
})