const mysql = require("mysql2/promise");
const config = require("../config");

const pool = mysql.createPool(config.dbPool);
async function query(sql, params) {
  const connection = await pool.getConnection();
//   const data = [];
  
  try {
    const [results] = await connection.execute(sql, params);
    // data.push("query run");
    return results;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  } finally {
    // data.push("connection released");
    connection.release();
  }

}

module.exports = {
  query,
};
