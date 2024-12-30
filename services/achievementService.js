// services/achievementService.js

// Import necessary modules and classes
const { initDB } = require('../config/database'); // Function to initialize the database connection pool
const Achievement = require('../models/achievementModel'); // Import the Achievement model

class AchievementService {
    // Constructor to initialize the pool
    constructor() {
        this.pool = null; // Initialize pool as null
        this.init(); // Call init method to set up the DB connection pool
    }

    // Initializes the connection pool
    async init() {
        this.pool = await initDB(); // Wait for DB initialization and assign it to this.pool
    }

    // Fetches all achievements from the database
    async getAllAchievements() {
        try {
            // Query the database to select all rows from the 'achievements' table
            const [rows] = await this.pool.query('SELECT * FROM achievements');
            // Map the rows to Achievement model instances and return
            return rows.map(Achievement.fromRow);
        } catch (e) {
            console.error(e); // Log any errors
            throw new Error(); // Rethrow the error
        }
    }

    // Fetches a specific achievement by its ID
    async getAchievementById(id) {
        // Query the database to fetch an achievement by its ID
        const [rows] = await this.pool.query('SELECT * FROM achievements WHERE achievement_id = ?', [id]);
        // If no rows are found, return null
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to an Achievement model instance and return it
        // return Achievement.fromRow(rows[0]);
        return rows[0];
    }

    // Creates a new achievement in the database
    async createAchievement(achievementData) {
        // Destructure the achievementData object to get name, category, description, and points
        const { name, category, descr, pointsr } = achievementData;
        // Insert the new achievement into the database
        const [result] = await this.pool.query(
            'INSERT INTO achievements (achievement_name, achievement_category, achievement_description, points_required) VALUES (?,?,?,?)',
            [name, category, descr, pointsr]
        );
        // Return the newly created achievement including its ID (from result.insertId)
        return { id: result.insertId, name, category, descr, pointsr };
    }

    // Updates an existing achievement in the database
    async updateAchievement(id, achievementData) {
        // Destructure the achievementData object to get name, category, description, and points
        const { name, category, descr, pointsr } = achievementData;
        // Update the achievement in the database based on its ID
        const [result] = await this.pool.query(
            'UPDATE achievements SET achievement_name = ?, achievement_category = ?, achievement_description = ?, points_required = ? WHERE achievement_id = ?',
            [name, category, descr, pointsr, id]
        );
        // Return true if any rows were updated, otherwise false
        return result.affectedRows > 0;
    }

    // Deletes an achievement from the database
    async deleteAchievement(id) {
        // Delete the achievement from the database using its ID
        const [result] = await this.pool.query('DELETE FROM achievements WHERE achievement_id = ?', [id]);
        // Return true if any rows were deleted, otherwise false
        return result.affectedRows > 0;
    }
}

// Export the instance of the AchievementService class to be used elsewhere
module.exports = new AchievementService();