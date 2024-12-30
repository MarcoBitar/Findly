// services/gameService.js

// Import necessary modules and classes
const { initDB } = require('../config/database');  // Import the initDB function to initialize the database connection pool
const Game = require('../models/gameModel');  // Import the Game model for mapping database rows to Game objects

class GameService {
    // Constructor to initialize the database connection pool
    constructor() {
        this.pool = null;  // Initialize the pool property as null
        this.init();  // Call init() to initialize the connection pool
    }

    // Initializes the database connection pool asynchronously
    async init() {
        this.pool = await initDB();  // Wait for the database connection to initialize and assign it to the pool property
    }

    // Fetches all games from the database
    async getAllGames() {
        try {
            // Query the database to select all rows from the 'games' table
            const [rows] = await this.pool.query('SELECT * FROM games');
            // Map each row to a Game instance and return the resulting array
            return rows.map(Game.fromRow);
        } catch (e) {
            console.error(e);  // Log any errors encountered
            throw new Error();  // Rethrow the error to be handled by the caller
        }
    }

    // Fetches a specific game by its ID
    async getGameById(id) {
        // Query the database to fetch a game by its ID
        const [rows] = await this.pool.query('SELECT * FROM games WHERE game_id = ?', [id]);
        // If no rows are found, return null to indicate no result
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to a Game model instance and return it
        // return Game.fromRow(rows[0]);
        return rows[0];
    }

    // Creates a new game in the database
    async createGame(gameData) {
        // Destructure the gameData object to get the game properties
        const { name, type, desc, diff } = gameData;
        // Insert the new game into the database
        const [result] = await this.pool.query(
            'INSERT INTO games (game_name, game_type, game_description, game_difficulty) VALUES (?,?,?,?)',
            [name, type, desc, diff]  // Insert the game properties into the 'games' table
        );
        // Return the newly created game with its generated game_id (from result.insertId)
        return { id: result.insertId, name, type, desc, diff };
    }

    // Updates an existing game in the database
    async updateGame(id, gameData) {
        // Destructure the gameData object to get the updated game properties
        const { name, type, desc, diff } = gameData;
        // Update the game in the database based on its ID
        const [result] = await this.pool.query(
            'UPDATE games SET game_name = ?, game_type = ?, game_description = ?, game_difficulty = ? WHERE game_id = ?',
            [name, type, desc, diff, id]  // Update the game properties in the 'games' table
        );
        // Return true if any rows were updated, otherwise return false
        return result.affectedRows > 0;
    }

    // Deletes a game from the database using its ID
    async deleteGame(id) {
        // Delete the game from the database using its ID
        const [result] = await this.pool.query('DELETE FROM games WHERE game_id = ?', [id]);
        // Return true if the deletion was successful (i.e., if any rows were deleted)
        return result.affectedRows > 0;
    }

    async checkAnswer(id, name) {
        try {
            // Check for null or undefined input and log it
            if (name == null) {
                throw new Error('Invalid input: answer cannot be null or undefined');
            }
    
            // Convert the input to a string and trim any extra spaces
            const input = String(name).trim().toLowerCase();
    
            // Query the database to fetch the game
            const result = await this.pool.query('SELECT * FROM games WHERE game_id = ?', [id]);
    
            // Check if the result contains any games
            if (result && result.length > 0) {
                const game = result[0];
                // Check if the game has a valid game_name
                if (game[0].game_name) {
                    // Compare the input with the game_name (case-insensitive)
                    if (input === game[0].game_name.toLowerCase()) {
                        return true;
                    } 
                }
            }
            return false;
        } catch (e) {
            // Catch and log any errors
            console.error('Error checking answer:', e);
            throw e;
        }
    }
    
}

// Export the instance of GameService to be used elsewhere
module.exports = new GameService();