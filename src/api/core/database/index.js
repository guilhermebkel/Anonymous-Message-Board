const Sequelize = require('sequelize')
const fs = require('fs-extra')

const ModelsDirectory = {
  fromRoot: 'src/api/models',
  fromHere: '../../models' 
}

module.exports = {
  setup
}

async function setup (){
  console.log('=> Connecting to database')
  await connect()

  console.log('Testing database connection...')
  await status()

  if(process.env.FORCE_SYNC === true){
    console.log('Synchronizing models...')
    await sync()
  }
}

function connect(){
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    quoteIdentifiers: false,
    ssl: true,
    dialectOptions: {
        ssl: true
    },
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      timestamps: true,
    }
  })
  global.sequelize = sequelize
}

async function status(){
  try {
    await sequelize.authenticate()
    console.log(`Connected to Postgres [${sequelize.options.host}]`)
  } 
  catch(error) {
    console.error(error)
  }
}

async function sync(){
  const models = await fs.readdir(ModelsDirectory.fromRoot)
  .then(models => models)
  .catch(error => console.error(error))

  await models.map(model => require(`${ModelsDirectory.fromHere}/${model}`)(sequelize, Sequelize))

  await sequelize.sync({ force: true })
}