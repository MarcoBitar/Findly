// services/clueService.js

// Import necessary modules and classes
const { initDB } = require('../config/database'); // Function to initialize the database connection pool
const Clue = require('../models/clueModel'); // Import the Clue model

class ClueService {
    // Constructor to initialize the pool
    constructor() {
        this.pool = null; // Initialize pool as null
        this.init(); // Call init method to set up the DB connection pool
    }

    // Initializes the connection pool
    async init() {
        this.pool = await initDB(); // Wait for DB initialization and assign it to this.pool
    }

    // Fetches all clues from the database
    async getAllClues() {
        try {
            // Query the database to select all rows from the 'clues' table
            const [rows] = await this.pool.query('SELECT * FROM clues');
            // Map the rows to Clue model instances and return them
            return rows.map(Clue.fromRow);
        } catch (e) {
            console.error(e); // Log any errors
            throw new Error(); // Rethrow the error
        }
    }

    // Fetches a specific clue by its ID
    async getClueById(id) {
        // Query the database to fetch a clue by its ID
        const [rows] = await this.pool.query('SELECT * FROM clues WHERE clue_id = ?', [id]);
        // If no rows are found, return null
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to a Clue model instance and return it
        // return Clue.fromRow(rows[0]);
        return rows[0];
    }

    // Creates a new clue in the database
    async createClue(clueData) {
        // Destructure the clueData object to get the clue text and treasure ID
        const { ctext, treasure_id } = clueData;
        // Insert the new clue into the database, setting the current date for the 'date_issued' field
        const [result] = await this.pool.query(
            'INSERT INTO clues (clue_text, date_issued, treasure_id) VALUES (?,NOW(),?)',
            [ctext, treasure_id]
        );
        // Return the newly created clue with its ID (from result.insertId)
        return { id: result.insertId, ctext, treasure_id };
    }

    // Updates an existing clue in the database
    async updateClue(id, clueData) {
        // Destructure the clueData object to get the clue text and treasure ID
        const { ctext, treasure_id } = clueData;
        // Update the clue in the database based on its ID, setting the current date for 'date_issued'
        const [result] = await this.pool.query(
            'UPDATE clues SET clue_text = ?, date_issued = NOW(), treasure_id = ? WHERE clue_id = ?',
            [ctext, treasure_id, id]
        );
        // Return true if any rows were updated, otherwise false
        return result.affectedRows > 0;
    }

    // Deletes a clue from the database
    async deleteClue(id) {
        // Delete the clue from the database using its ID
        const [result] = await this.pool.query('DELETE FROM clues WHERE clue_id = ?', [id]);
        // Return true if any rows were deleted, otherwise false
        return result.affectedRows > 0;
    }
}

// Export the instance of the ClueService class to be used elsewhere
module.exports = new ClueService();