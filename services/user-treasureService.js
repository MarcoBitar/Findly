// services/user-treasureService.js

// Import necessary modules and classes
const { initDB } = require('../config/database');  // Import the initDB function to initialize the database connection pool
const UserTreasure = require('../models/user-treasureModel');  // Import the UserTreasure model for mapping database rows to UserTreasure objects

class UserTreasureService {
    // Constructor to initialize the database connection pool
    constructor() {
        this.pool = null;  // Initialize the pool property as null
        this.init();  // Call init() to initialize the connection pool
    }

    // Initializes the database connection pool asynchronously
    async init() {
        this.pool = await initDB();  // Wait for the database connection to initialize and assign it to the pool property
    }

    // Fetches all user-treasure associations from the database
    async getAllUserTreasures() {
        try {
            // Query the database to select all rows from the 'users-treasures' table
            const [rows] = await this.pool.query('SELECT * FROM `users-treasures`');
            // Map each row to a UserTreasure instance and return the resulting array
            return rows.map(UserTreasure.fromRow);
        } catch (e) {
            console.error(e);  // Log any errors encountered
            throw new Error();  // Rethrow the error to be handled by the caller
        }
    }

    // Fetches a specific user-treasure association by its UTID (user treasure ID)
    async getUserTreasureById(utid) {
        // Query the database to fetch a user-treasure by its UTID
        const [rows] = await this.pool.query('SELECT * FROM `users-treasures` WHERE usertreasure_id = ?', [utid]);
        // If no rows are found, return null to indicate no result
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to a UserTreasure model instance and return it
        return UserTreasure.fromRow(rows[0]);
    }

    // Creates a new user-treasure association in the database
    async createUserTreasure(userTreasureData) {
        // Destructure the userTreasureData object to extract user_id, treasure_id, and is_verified
        const { user_id, treasure_id, is_v } = userTreasureData;
        // Insert the new user-treasure association into the database with current date as date_found
        const [result] = await this.pool.query(
            'INSERT INTO `users-treasures` (user_id, treasure_id, is_verified, date_found) VALUES (?,?,?,NOW())',
            [user_id, treasure_id, is_v]  // Use current date for date_found
        );
        // Return the newly created user-treasure association with its UTID (user treasure ID) and other details
        return { utid: result.insertId, user_id, treasure_id, is_v };
    }

    // Updates an existing user-treasure association in the database
    async updateUserTreasure(utid, userTreasureData) {
        // Destructure the userTreasureData object to extract user_id, treasure_id, and is_verified
        const { user_id, treasure_id, is_v } = userTreasureData;
        // Update the user-treasure association in the database using the UTID
        const [result] = await this.pool.query(
            'UPDATE `users-treasures` SET user_id = ?, treasure_id = ?, is_verified = ?, date_found = NOW() WHERE usertreasure_id = ?',
            [user_id, treasure_id, is_v, utid]  // Set the current date for date_found
        );
        // Return true if any rows were updated, otherwise return false
        return result.affectedRows > 0;
    }

    // Deletes a user-treasure association from the database using its UTID
    async deleteUserTreasure(utid) {
        // Delete the user-treasure association from the database using its UTID
        const [result] = await this.pool.query('DELETE FROM `users-treasures` WHERE usertreasure_id = ?', [utid]);
        // Return true if the deletion was successful (i.e., if any rows were deleted)
        return result.affectedRows > 0;
    }
}

// Export the instance of UserTreasureService to be used elsewhere
module.exports = new UserTreasureService();