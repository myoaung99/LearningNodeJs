const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "myomyintaung",
});

module.exports = connection.promise();
