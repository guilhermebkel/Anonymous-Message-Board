const Sequelize = require('sequelize');

const databaseConnection = async (databaseURI) => {

    const connection = new Sequelize(databaseURI, {
        logging: false,
        quoteIdentifiers: false,
        ssl: true,
        dialectOptions: {
            ssl: true
        }
    });

    return connection;

}

module.exports = databaseConnection;