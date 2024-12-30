// services/userService.js

// Import necessary modules and classes
const { initDB } = require('../config/database');  // Import the initDB function to initialize the database connection pool
const User = require('../models/userModel');  // Import the User model for mapping database rows to User objects

class UserService {
    // Constructor to initialize the database connection pool
    constructor() {
        this.pool = null;  // Initialize the pool property as null
        this.init();  // Call init() to initialize the database connection pool
    }

    // Initializes the database connection pool asynchronously
    async init() {
        this.pool = await initDB();  // Wait for the database connection to initialize and assign it to the pool property
    }

    // Fetches all users from the database
    async getAllUsers() {
        try {
            // Query the database to select all rows from the 'users' table
            const [rows] = await this.pool.query('SELECT * FROM users');
            // Map each row to a User instance and return the resulting array
            return rows.map(User.fromRow);
        } catch (e) {
            console.error(e);  // Log any errors encountered
            throw new Error();  // Rethrow the error to be handled by the caller
        }
    }

    // Fetches a specific user by their ID
    async getUserById(id) {
        // Query the database to fetch a user by their user ID
        const [rows] = await this.pool.query('SELECT * FROM users WHERE user_id = ?', [id]);
        // If no rows are found, return null to indicate no result
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to a User model instance and return it
        // return User.fromRow(rows[0]);
        return rows[0];
    }

    // Creates a new user in the database
    async createUser(userData) {
        // Destructure the userData object to extract name, email, and password
        const { name, email, pass } = userData;
        // Insert the new user into the database with initial points and rewards set to 0
        const [result] = await this.pool.query(
            'INSERT INTO users (username, user_email, user_password, user_points, user_rewards) VALUES (?, ?, ?, ?, ?)',
            [name, email, pass, 0, 0]  // Default points and rewards are set to 0
        );
        // Return the newly created user object with its ID and other details
        return { id: result.insertId, name, email, pass, points: 0, rewards: 0 };
    }

    // Updates an existing user in the database
    async updateUser(id, userData) {
        // Destructure the userData object to extract name, email, password, points, and rewards
        const { name, email, pass, points, rewards } = userData;
        // Update the user in the database using the user ID
        const [result] = await this.pool.query(
            'UPDATE users SET username = ?, user_email = ?, user_password = ?, user_points = ?, user_rewards = ? WHERE user_id = ?',
            [name, email, pass, points, rewards, id]  // Set the new values for the user
        );
        // Return true if any rows were updated, otherwise return false
        return result.affectedRows > 0;
    }

    // Deletes a user from the database using their ID
    async deleteUser(id) {
        // Delete the user from the database using their user ID
        const [result] = await this.pool.query('DELETE FROM users WHERE user_id = ?', [id]);
        // Return true if the deletion was successful (i.e., if any rows were deleted)
        return result.affectedRows > 0;
    }

    // Checks if a user can log in by validating their username and password
    async checkLogin(name, pass) {
        // Query the database to check if a user exists with the given username and password
        const [result] = await this.pool.query('SELECT * FROM users WHERE username = ? AND user_password = ?', [name, pass]);
        // Return user object if found (i.e., valid login), otherwise return null
        return result.length? result[0] : null;
    }

    // Finds if a username exists in the database
    async findUserByName(name) {
        // Query the database to check if this username is already in use
        const [existingUser] = await this.pool.query(
            'SELECT * FROM users WHERE username = ?', [name]);
        return existingUser.length? existingUser[0] : false;
    }
}

// Export the instance of UserService to be used elsewhere
module.exports = new UserService();