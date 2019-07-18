const Sequelize = require('sequelize')

module.exports = {
  setup
}

async function setup (){
  console.log('=> Connecting to database')
  await connect()

  console.log('Testing database connection...')
  await status()

  console.log('Synchronizing models...')
  await sequelize.sync()
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