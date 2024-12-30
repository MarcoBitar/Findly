// services/leaderboardService.js

// Import necessary modules and classes
const { initDB } = require('../config/database');  // Import the initDB function to initialize the database connection pool
const Leaderboard = require('../models/leaderboardModel');  // Import the Leaderboard model for mapping database rows to Leaderboard objects

class LeaderboardService {
    // Constructor to initialize the database connection pool
    constructor() {
        this.pool = null;  // Initialize the pool property as null
        this.init();  // Call init() to initialize the connection pool
    }

    // Initializes the database connection pool asynchronously
    async init() {
        this.pool = await initDB();  // Wait for the database connection to initialize and assign it to the pool property
    }

    // Fetches all leaderboards from the database
    async getAllLeaderboards() {
        try {
            // Query the database to select all rows from the 'leaderboards' table
            const [rows] = await this.pool.query(`
                SELECT l.*, u.username 
                FROM leaderboards l 
                JOIN users u ON l.user_id = u.user_id
                ORDER BY l.points_earned DESC
            `);
            // Map each row to a Leaderboard instance and return the resulting array
            return rows.map(Leaderboard.fromRow);
        } catch (e) {
            console.error(e);  // Log any errors encountered
            throw new Error();  // Rethrow the error to be handled by the caller
        }
    }

    // Fetches a specific leaderboard by its ID
    async getLeaderboardById(id) {
        // Query the database to fetch a leaderboard by its ID
        const [rows] = await this.pool.query('SELECT * FROM leaderboards WHERE leaderboard_id = ?', [id]);
        // If no rows are found, return null to indicate no result
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to a Leaderboard model instance and return it
        // return Leaderboard.fromRow(rows[0]);
        return rows[0];
    }

    // Creates a new leaderboard entry in the database
    async createLeaderboard(leaderboardData) {
        // Destructure the leaderboardData object to get points_earned and user_id
        const { points_e, user_id } = leaderboardData;
        // Insert the new leaderboard entry into the database with current date and points_earned
        const [result] = await this.pool.query(
            'INSERT INTO leaderboards (leaderboard_date, points_earned, user_id) VALUES (NOW(),?,?)',
            [points_e, user_id]  // Use current date for leaderboard_date
        );
        // Return the newly created leaderboard entry with its ID and other details
        return { id: result.insertId, points_e, user_id };
    }

    // Updates an existing leaderboard entry in the database
    async updateLeaderboard(id, leaderboardData) {
        // Destructure the leaderboardData object to get points_earned and user_id
        const { points_e, user_id } = leaderboardData;
        // Update the leaderboard entry in the database using the leaderboard ID
        const [result] = await this.pool.query(
            'UPDATE leaderboards SET leaderboard_date = NOW(), points_earned = ?, user_id = ? WHERE leaderboard_id = ?',
            [points_e, user_id, id]  // Set the current date for leaderboard_date and update the other details
        );
        // Return true if any rows were updated, otherwise return false
        return result.affectedRows > 0;
    }

    // Deletes a leaderboard entry from the database using its ID
    async deleteLeaderboard(id) {
        // Delete the leaderboard entry from the database using its ID
        const [result] = await this.pool.query('DELETE FROM leaderboards WHERE leaderboard_id = ?', [id]);
        // Return true if the deletion was successful (i.e., if any rows were deleted)
        return result.affectedRows > 0;
    }
}

// Export the instance of LeaderboardService to be used elsewhere
module.exports = new LeaderboardService();
