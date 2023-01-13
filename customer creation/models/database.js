const mysql = require('mysql2');
const dotenv = require('dotenv');
const fs = require('fs')

dotenv.config();

const seedQuery = fs.readFileSync("script/spFinduserbyemail.sql", {
  encoding: "utf-8",
})

const connection = mysql.createConnection({
    host:  process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    insecureAuth : true
  });

  
  connection.connect((err) => {
    console.log(err)
    if (err) throw err;
    console.log('Connected to MySQL database');
  });

  connection.query(seedQuery,  (err, result) => {
    if (err) {
      console.log(err)
      throw err
    }
  
    console.log("SQL seed completed! Password for initial admin account: " + Object.keys(result) )
    connection.end()
  })

  module.exports = connection;