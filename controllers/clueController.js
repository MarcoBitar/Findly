// controllers/clueController.js

// Import the necessary services for interacting with clues and treasures
const clueService = require('../services/clueService');
const treasureService = require('../services/treasureService');

class ClueController {

    // Handle the request to get all clues
    async getAllClues(req, res) {
        try {
            // Fetch all clues from the clueService
            const clues = await clueService.getAllClues();
            const data = {
                clues:clues
            }

            // Respond with the list of clues and HTTP status 200 (OK)
            // res.status(200).json(clues);
            res.status(200).render('cluePage', data);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            // console.error('Error fetching clues:', e);
            // res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to get a specific clue by its ID
    async getClueById(req, res) {
        try {
            // Parse the clue ID from the URL parameter
            const id = parseInt(req.params.id, 10);
            // Fetch the clue by its ID using the clueService
            const clue = await clueService.getClueById(id);
            // If the clue is not found, respond with HTTP status 404 (Not Found)
            if (!clue) {
                return res.status(404).json({ message: 'Clue not found' });
            }
            // Respond with the clue data and HTTP status 200 (OK)
            // res.status(200).json(clue);
            res.status(200).render('cluePage', { clue });
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            // console.error('Error fetching clue', e);
            // res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to create a new clue
    async createClue(req, res) {
        try {
            // Extract the clue text and treasure_id from the request body
            const { ctext, treasure_id } = req.body;
            // Fetch the treasure using the treasure_id to ensure it exists
            const treasure = await treasureService.getTreasureById(treasure_id);
            // If the treasure does not exist, respond with HTTP status 404 (Not Found)
            if (!treasure) {
                return res.status(404).json({ message: 'Treasure not found' });
            }
            // Create the new clue using the clueService
            const newClue = await clueService.createClue({ ctext, treasure_id });
            // Respond with the newly created clue and HTTP status 201 (Created)
            res.status(201).json(newClue);
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error creating clue', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to update an existing clue
    async updateClue(req, res) {
        try {
            // Parse the clue ID from the URL parameter
            const id = parseInt(req.params.id, 10);
            // Extract the updated clue text and treasure_id from the request body
            const { ctext, treasure_id } = req.body;
            // Attempt to update the clue using the clueService
            const success = await clueService.updateClue(id, { ctext, treasure_id });
            // If the clue is not found or no changes were made, respond with HTTP status 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Clue not found or no changes made' });
            }
            // Fetch the treasure using the treasure_id to ensure it exists
            const treasure = await treasureService.getTreasureById(treasure_id);
            // If the treasure does not exist, respond with HTTP status 404 (Not Found)
            if (!treasure) {
                return res.status(404).json({ message: 'Treasure not found' });
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Clue updated successfully' });
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error updating clue', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to delete a clue
    async deleteClue(req, res) {
        try {
            // Parse the clue ID from the URL parameter
            const id = parseInt(req.params.id, 10);
            // Attempt to delete the clue using the clueService
            const success = await clueService.deleteClue(id);
            // If the clue is not found, respond with HTTP status 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Clue not found' });
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Clue deleted successfully' });
        } catch (e) {
            // If an error occurs, log it and respond with HTTP status 500 (Internal Server Error)
            console.error('Error deleting clue', e);
            res.status(500).json('internalServerErrorPage');
        }
    }
}

// Export an instance of the ClueController class to be used in the routes
module.exports = new ClueController();