// services/game-clueService.js

// Import necessary modules and classes
const { initDB } = require('../config/database');  // Import the initDB function for database initialization
const GameClue = require('../models/game-clueModel');  // Import the GameClue model for mapping database rows

class GameClueService {
    // Constructor to initialize the database connection pool
    constructor() {
        this.pool = null;  // Initialize the pool property as null
        this.init();  // Call the init method to initialize the database connection pool
    }

    // Initializes the connection pool asynchronously
    async init() {
        this.pool = await initDB();  // Wait for the database to initialize and assign the pool
    }

    // Fetches all game-clue associations from the database
    async getAllGameClues() {
        try {
            // Query the database to select all rows from the 'games-clues' table
            const [rows] = await this.pool.query('SELECT * FROM `games-clues`');
            // Map each row to a GameClue instance and return the resulting array
            return rows.map(GameClue.fromRow);
        } catch (e) {
            console.error(e);  // Log any errors encountered
            throw new Error();  // Rethrow the error to be handled by the caller
        }
    }

    // Fetches a specific game-clue association by its GCID (game clue ID)
    async getGameClueById(gcid) {
        // Query the database to fetch a game-clue by its GCID
        const [rows] = await this.pool.query('SELECT * FROM `games-clues` WHERE gameclue_id = ?', [gcid]);
        // If no rows are found, return null to indicate no result
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to a GameClue model and return it
        return GameClue.fromRow(rows[0]);
    }

    // Creates a new game-clue association in the database
    async createGameClue(gameClueData) {
        // Destructure the gameClueData object to extract game_id and clue_id
        const { game_id, clue_id } = gameClueData;
        // Insert the new game-clue association into the database
        const [result] = await this.pool.query(
            'INSERT INTO `games-clues` (game_id, clue_id) VALUES (?, ?)',
            [game_id, clue_id]
        );
        // Return the new game-clue association object with GCID (game clue ID) and other details
        return { gcid: result.insertId, game_id, clue_id };
    }

    // Updates an existing game-clue association in the database
    async updateGameClue(gcid, gameClueData) {
        // Destructure the gameClueData object to extract the game_id and clue_id
        const { game_id, clue_id } = gameClueData;
        // Update the specified game-clue association in the database based on its GCID
        const [result] = await this.pool.query(
            'UPDATE `games-clues` SET game_id = ?, clue_id = ? WHERE gameclue_id = ?',
            [game_id, clue_id, gcid]
        );
        // Return true if any rows were updated, otherwise return false
        return result.affectedRows > 0;
    }

    // Deletes a game-clue association from the database using its GCID
    async deleteGameClue(gcid) {
        // Delete the game-clue association from the database using its GCID
        const [result] = await this.pool.query('DELETE FROM `games-clues` WHERE gameclue_id = ?', [gcid]);
        // Return true if the deletion was successful (i.e., if any rows were deleted)
        return result.affectedRows > 0;
    }
}
// Export the instance of the GameClueService class to be used elsewhere
module.exports = new GameClueService();