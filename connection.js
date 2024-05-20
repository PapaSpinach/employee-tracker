require('dotenv').config();
const mysql = require('mysql2/promise');

async function connectToDb() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_tracker',
    password: process.env.DB_PASSWORD
  });

  return db;
}

module.exports = connectToDb;