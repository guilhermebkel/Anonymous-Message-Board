module.exports = {
  boot
}

async function boot(callback) {
  require('dotenv').config()
  await require('./database').setup()
  await require('./server').setup()

  if(process.env.NODE_ENV === 'development'){
    callback()
  }
}

if(process.env.NODE_ENV === 'production'){
  boot()
}