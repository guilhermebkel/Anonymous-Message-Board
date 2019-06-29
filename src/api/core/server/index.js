const express = require('express');
const { cors, helmet } = require('./middlewares');
const server = express();

module.exports = {
  setup
}

async function setup (){
  cors(server);
  server.listen(process.env.PORT, () => {
      console.log("Server listening on port", process.env.PORT);
  });
  server.get("", (req, res) => {
      res.json({"status": "Express server is running!"});
  })
}