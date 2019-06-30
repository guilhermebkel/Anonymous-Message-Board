const express = require('express')
const { cors, security } = require('./middlewares')
const routes = require('./routes')
const server = express()

module.exports = {
  setup
}

async function setup (){
  console.log('Activating cors...')
  await cors(server)
  console.log('Setting up security methods...')
  await security(server)
  server.listen(process.env.PORT, () => {
      console.log(`- Server running [PORT ${process.env.PORT}]`)
  });
  routes(server)
  server.get("/", (req, res) => {
      res.json({"status": "Express server is running!"})
  })
}