// services/user-achievementService.js

// Import necessary modules and classes
const { initDB } = require('../config/database');  // Import the initDB function to initialize the database connection pool
const UserAchievement = require('../models/user-achievementModel');  // Import the UserAchievement model for mapping database rows to UserAchievement objects

class UserAchievementService {
    // Constructor to initialize the database connection pool
    constructor() {
        this.pool = null;  // Initialize the pool property as null
        this.init();  // Call init() to initialize the connection pool
    }

    // Initializes the database connection pool asynchronously
    async init() {
        this.pool = await initDB();  // Wait for the database connection to initialize and assign it to the pool property
    }

    // Fetches all user-achievement associations from the database
    async getAllUserAchievements() {
        try {
            // Query the database to select all rows from the 'users-achievements' table
            const [rows] = await this.pool.query('SELECT * FROM `users-achievements`');
            // Map each row to a UserAchievement instance and return the resulting array
            return rows.map(UserAchievement.fromRow);
        } catch (e) {
            console.error(e);  // Log any errors encountered
            throw new Error();  // Rethrow the error to be handled by the caller
        }
    }

    // Fetches a specific user-achievement association by its UAID (user achievement ID)
    async getUserAchievementById(uaid) {
        // Query the database to fetch a user-achievement by its UAID
        const [rows] = await this.pool.query('SELECT * FROM `users-achievements` WHERE userachievement_id = ?', [uaid]);
        // If no rows are found, return null to indicate no result
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to a UserAchievement model instance and return it
        return UserAchievement.fromRow(rows[0]);
    }

    // Creates a new user-achievement association in the database
    async createUserAchievement(userAchievementData) {
        // Destructure the userAchievementData object to extract user_id, achievement_id, and date_received
        const { user_id, achievement_id, date_r } = userAchievementData;
        // Insert the new user-achievement association into the database with current date as date_received
        const [result] = await this.pool.query(
            'INSERT INTO `users-achievements` (user_id, achievement_id, date_received) VALUES (?,?,NOW())',
            [user_id, achievement_id]  // Use current date for date_received
        );
        // Return the newly created user-achievement association with its UAID (user achievement ID) and other details
        return { uaid: result.insertId, user_id, achievement_id };
    }

    // Updates an existing user-achievement association in the database
    async updateUserAchievement(uaid, userAchievementData) {
        // Destructure the userAchievementData object to extract user_id and achievement_id
        const { user_id, achievement_id } = userAchievementData;
        // Update the user-achievement association in the database using the UAID
        const [result] = await this.pool.query(
            'UPDATE `users-achievements` SET user_id = ?, achievement_id = ?, date_received = NOW() WHERE userachievement_id = ?',
            [user_id, achievement_id, uaid]  // Set the current date for date_received
        );
        // Return true if any rows were updated, otherwise return false
        return result.affectedRows > 0;
    }

    // Deletes a user-achievement association from the database using its UAID
    async deleteUserAchievement(uaid) {
        // Delete the user-achievement association from the database using its UAID
        const [result] = await this.pool.query('DELETE FROM `users-achievements` WHERE userachievement_id = ?', [uaid]);
        // Return true if the deletion was successful (i.e., if any rows were deleted)
        return result.affectedRows > 0;
    }
}

// Export the instance of UserAchievementService to be used elsewhere
module.exports = new UserAchievementService();