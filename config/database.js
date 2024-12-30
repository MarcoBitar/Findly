// config/database.js

// Import the mysql2 package to use promises with MySQL
const mysql = require('mysql2/promise');

// Import .env file
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Declare a variable to hold the database connection pool
let pool;

// Function to initialize the database connection pool
const initDB = async () => {
  // Check if the pool is already created, to avoid creating multiple pools
  if (!pool) {
    // Create a new connection pool using credentials from environment variables
    pool = mysql.createPool({
      host: process.env.DB_HOST,           // Database host
      user: process.env.DB_USER,           // Database user
      password: process.env.DB_PASSWORD,   // Database password
      database: process.env.DB_NAME,       // Database name
      port: process.env.DB_PORT,           // Database port
      waitForConnections: true,            // Wait for connections to be available in the pool
      connectionLimit: 10,                 // Limit of concurrent connections in the pool
      queueLimit: 0,                       // No limit on the queue of waiting connections
    });

    // Test the database connection
    try {
      // Attempt to get a connection from the pool
      await pool.getConnection();
      console.log(`Connected to ${process.env.DB_NAME}`);  // Log success message
    } catch (error) {
      // If connection fails, log the error and exit the process
      console.error(`Unable to connect to db ${error}`);
      process.exit(1);
    }
  }

  // Return the connection pool
  return pool;
};

// Export the initDB function to be used elsewhere in the application
module.exports = { initDB };