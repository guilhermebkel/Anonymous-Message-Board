const fs = require('fs')
const Sequelize = require('sequelize')
const Umzug = require('umzug')

const core = require('../../core')

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

const models = {}

module.exports = {
  setup,
  get models () {
    return models
  }
}

async function setup () {
  global.Sequelize = Sequelize
  setupConnection()
  await testConnection()
  setupModels()
  if (process.env.MIGRATE_DB) {
    await runMigrations()
  }
  console.log('Synchronizing models...')
  await sequelize.sync()
}

function setupConnection () {
  const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false,
    quoteIdentifiers: false,
    ssl: true,
    dialectOptions: {
        ssl: true
    }
  })
  global.sequelize = sequelize
}

async function testConnection () {
  try {
    await sequelize.authenticate()
    console.log(`Connected to Postgres [${DB_HOST}]`)
  } catch (e) {
    console.error('[ERROR] Unable to connect to the database:', e.message)
    process.exit(1)
  }
}

function setupModels () {
  const modelList = fs.readdirSync(core.dirs.models)
  for (const model of modelList) {
    if (model.startsWith('_') || model.startsWith('index')) continue
    const modelName = model.split('.').shift()

    setupModel(modelName, sequelize.import(`${core.dirs.models}/${model}`))
  }

  // setup models associations
  require('./associations')(models)
}

async function setupModel (modelName, modelObj) {
  models[modelName] = modelObj
}

async function runMigrations () {
  console.log('Running migrations...')
  const umzug = new Umzug({
    storage: 'sequelize',
    storageOptions: {
      sequelize
    },
    migrations: {
      params: [sequelize.getQueryInterface(), Sequelize],
      path: `${core.dirs.root}/src/db/migrations`
    }
  })
  await umzug.up()

  return Promise.resolve(true)
}