require("dotenv").config()
module.exports = {
  HOST: process.env.host,
  USER: process.env.user,
  PASSWORD: process.env.dbpassword,
  DB: process.env.database,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};