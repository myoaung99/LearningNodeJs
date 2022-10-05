// const mysql = require("mysql2");
//
// const connection = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "myomyintaung",
// });
//
// module.exports = connection.promise();

// class constructor
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "myomyintaung", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
