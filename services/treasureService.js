// services/treasureService.js

// Import necessary modules and classes
const { initDB } = require('../config/database');  // Import the initDB function to initialize the database connection pool
const Treasure = require('../models/treasureModel');  // Import the Treasure model for mapping database rows to Treasure objects

class TreasureService {
    // Constructor to initialize the database connection pool
    constructor() {
        this.pool = null;  // Initialize the pool property as null
        this.init();  // Call init() to initialize the connection pool
    }

    // Initializes the database connection pool asynchronously
    async init() {
        this.pool = await initDB();  // Wait for the database connection to initialize and assign it to the pool property
    }

    // Fetches all treasures from the database
    async getAllTreasures() {
        try {
            // Query the database to select all rows from the 'treasures' table
            const [rows] = await this.pool.query('SELECT * FROM treasures');
            // Map each row to a Treasure instance and return the resulting array
            return rows.map(Treasure.fromRow);
        } catch (e) {
            console.error(e);  // Log any errors encountered
            throw new Error();  // Rethrow the error to be handled by the caller
        }
    }

    // Fetches a specific treasure by its ID
    async getTreasureById(id) {
        // Query the database to fetch a treasure by its ID
        const [rows] = await this.pool.query('SELECT * FROM treasures WHERE treasure_id = ?', [id]);
        // If no rows are found, return null to indicate no result
        if (rows.length === 0) {
            return null;
        }
        // Map the first row to a Treasure model instance and return it
        // return Treasure.fromRow(rows[0]);
        return rows[0];
    }

    // Creates a new treasure entry in the database
    async createTreasure(treasureData) {
        // Destructure the treasureData object to get treasure_name, treasure_description, and treasure_url
        const { name, desc, url } = treasureData;
        // Insert the new treasure entry into the database with current date as date_added
        const [result] = await this.pool.query(
            'INSERT INTO treasures (treasure_name, treasure_description, treasure_url, date_added) VALUES (?,?,?,NOW())',
            [name, desc, url]  // Use current date for date_added
        );
        // Return the newly created treasure entry with its ID and other details
        return { id: result.insertId, name, desc, url };
    }

    // Updates an existing treasure entry in the database
    async updateTreasure(id, treasureData) {
        // Destructure the treasureData object to get treasure_name, treasure_description, and treasure_url
        const { name, desc, url } = treasureData;
        // Update the treasure entry in the database using the treasure ID
        const [result] = await this.pool.query(
            'UPDATE treasures SET treasure_name = ?, treasure_description = ?, treasure_url = ?, date_added = NOW() WHERE treasure_id = ?',
            [name, desc, url, id]  // Set the current date for date_added and update the other details
        );
        // Return true if any rows were updated, otherwise return false
        return result.affectedRows > 0;
    }

    // Deletes a treasure entry from the database using its ID
    async deleteTreasure(id) {
        // Delete the treasure entry from the database using its ID
        const [result] = await this.pool.query('DELETE FROM treasures WHERE treasure_id = ?', [id]);
        // Return true if the deletion was successful (i.e., if any rows were deleted)
        return result.affectedRows > 0;
    }

    async checkAnswer(id, url) {
        try {
            // Check for null or undefined input and log it
            if (url == null) {
                throw new Error('Invalid input: answer cannot be null or undefined');
            }

            const input = url;
    
            // Query the database to fetch the treasure
            const result = await this.pool.query('SELECT * FROM treasures WHERE treasure_id = ?', [id]);
    
            // Check if the result contains any treasures
            if (result && result.length > 0) {
                const treasure = result[0];
    
                // Check if the treasure has a valid treasure_url
                if (treasure[0].treasure_url) {
                    // Compare the input with the treasure_url
                    if (input === treasure[0].treasure_url) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
    
            return false;
        } catch (e) {
            // Catch and log any errors
            console.error('Error checking answer:', e);
            throw e;
        }
    }
}

// Export the instance of TreasureService to be used elsewhere
module.exports = new TreasureService();