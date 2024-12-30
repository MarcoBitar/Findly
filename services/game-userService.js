// services/game-userService.js

// Import necessary modules and classes
const { initDB } = require('../config/database'); // Import initDB function to initialize database connection pool
const GameUser = require('../models/game-userModel'); // Import the GameUser model for mapping database rows to objects

class GameUserService {
    // Constructor to initialize the database connection pool
    constructor() {
        this.pool = null; // Initialize the pool property as null
        this.init(); // Call init() method to initialize the connection pool
    }

    // Initializes the database connection pool asynchronously
    async init() {
        this.pool = await initDB(); // Wait for the database connection to initialize and assign it to the pool property
    }

    // Fetches all game-user associations from the database
    async getAllGameUsers() {
        try {
            // Query the database to select all rows from the 'games-users' table
            const [rows] = await this.pool.query('SELECT * FROM `games-users`');
            // Map each row to a GameUser instance and return the resulting array
            return rows.map(GameUser.fromRow);
        } catch (e) {
            console.error(e); // Log any errors encountered during the database operation
            throw new Error(); // Rethrow the error to be handled by the caller
        }
    }

    // Fetches a specific game-user association by its GUID (game-user ID)
    async getGameUserById(guid) {
        // Query the database to fetch a game-user by its GUID
        const [rows] = await this.pool.query('SELECT * FROM `games-users` WHERE gameuser_id = ?', [guid]);
        // If no rows are found, return null to indicate no result
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to a GameUser model instance and return it
        return GameUser.fromRow(rows[0]);
    }

    // Creates a new game-user association in the database
    async createGameUser(gameUserData) {
        // Destructure the gameUserData object to get the game_id, user_id, and status
        const { game_id, user_id, score, status } = gameUserData;
        // Insert the new game-user association into the database
        const [result] = await this.pool.query(
            'INSERT INTO `games-users` (game_id, user_id, score, status, date_completed) VALUES (?,?,?,?,NOW())',
            [game_id, user_id, 0, status] // Default score is set to 0, and date_completed is set to NOW()
        );
        // Return the newly created game-user association with its GUID (game-user ID) and other details
        return { guid: result.insertId, game_id, user_id, score, status };
    }

    // Updates an existing game-user association in the database
    async updateGameUser(guid, gameUserData) {
        // Destructure the gameUserData object to get the game_id, user_id, score, and status
        const { game_id, user_id, score, status } = gameUserData;
        // Update the game-user association in the database based on its GUID
        const [result] = await this.pool.query(
            'UPDATE `games-users` SET game_id = ?, user_id = ?, score = ?, status = ?, date_completed = NOW() WHERE gameuser_id = ?',
            [game_id, user_id, score, status, guid]
        );
        // Return true if any rows were updated, otherwise return false
        return result.affectedRows > 0;
    }

    // Deletes a game-user association from the database using its GUID
    async deleteGameUser(guid) {
        // Delete the game-user association from the database using its GUID
        const [result] = await this.pool.query('DELETE FROM `games-users` WHERE gameuser_id = ?', [guid]);
        // Return true if the deletion was successful (i.e., if any rows were deleted)
        return result.affectedRows > 0;
    }
}

// Export the instance of GameUserService to be used elsewhere
module.exports = new GameUserService();