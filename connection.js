const mysql = require('mysql2/promise');

async function connectToDb() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_tracker',
  });

  return db;
}

module.exports = connectToDb;