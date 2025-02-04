import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "ucka.veleri.hr",
  user: "mmiskovic",
  password: "11",
  database: "mmiskovic",
  port: 3306,
  connectionLimit: 10
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL Database!");
    connection.release();
  }
});

export default pool.promise();
