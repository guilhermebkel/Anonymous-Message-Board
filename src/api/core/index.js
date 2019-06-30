const ROOT_DIR = process.cwd()

const dirs = {
  root: ROOT_DIR,
  server: `${ROOT_DIR}/src/api`,
  controllers: `${ROOT_DIR}/src/api/controllers`,
  models: `${ROOT_DIR}/src/api/models`,
  services: `${ROOT_DIR}/src/api/routes`,
}

module.exports = {
  boot,
  dirs
}

async function boot() {
  require('dotenv').config()
  await require('./database').setup()
  await require('./server').setup()

  if(process.env.NODE_ENV === 'development'){
    require('./tests').setup(server)
  }
}

boot();