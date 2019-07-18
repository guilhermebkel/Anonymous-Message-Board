const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { security } = require('./middlewares')
const routes = require('./routes')
const server = express()

module.exports = {
  setup
}

async function setup (){
  console.log('=> Setting up server')
  server.use(bodyParser.urlencoded({ extended: 'false' }));
  server.use(bodyParser.json());

  console.log('Activating cors...')
  server.use(cors())

  console.log('Initializing security methods...')
  await security(server)

  console.log('Activating routes...')
  routes(server)

  const app = server.listen(process.env.PORT, () => {
      console.log(`Server running [PORT ${process.env.PORT}]`)
  });
  if (process.env.CLOSE) app.close() && console.log(`Server running [PORT ${process.env.PORT}]`)

  server.get("/", (req, res) => {
      res.json({"status": "Express server is running!"})
  })

  global.server = server
}