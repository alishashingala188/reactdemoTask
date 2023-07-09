const { Sequelize, DataTypes } = require('sequelize');
const dbConfing = require("../Connect/config")

const db = new Sequelize(
    dbConfing.DB,
    dbConfing.USER,
    dbConfing.PASSWORD, {
    host: dbConfing.HOST,
    dialect: dbConfing.dialect,
    operatorsAliases: false,
    pool: {

        max: dbConfing.pool.max,
        min: dbConfing.pool.min,
        acquire: dbConfing.pool.acquire,
        idle: dbConfing.pool.idle,
    }
}

)

db.authenticate()
    .then(() => {
        console.log('connected...!');

    })
    .catch(err => {
        console.log("error" + err)

    })


module.exports = db 