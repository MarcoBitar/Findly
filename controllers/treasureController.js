// controllers/treasureController.js

// Import the necessary service to handle treasure-related operations
const treasureService = require('../services/treasureService');

// Define the TreasureController class to manage treasure-related requests
class TreasureController {

    // Handle the request to get all treasures
    async getAllTreasures(req, res) {
        try {
            // Fetch all treasures from the treasureService
            const treasures = await treasureService.getAllTreasures();
            const data = {
                treasures:treasures
            }
            // Respond with the treasures data and HTTP status 200 (OK)
            // res.status(200).json(treasures);
            res.status(200).render('treasuresPage', data)
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            // console.error('Error fetching treasures:', e);
            // res.status(500).json({message: 'Internal server error'});
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to get a specific treasure by its ID
    async getTreasureById(req, res) {
        try {
            // Parse the treasure ID (id) from the request parameters
            const id = parseInt(req.params.id, 10);
    
            // Fetch the treasure by ID using the treasureService
            const treasure = await treasureService.getTreasureById(id);
    
            // If the treasure is not found, respond with 404 (Not Found)
            if (!treasure) {
                return res.status(404).render('treasuresPage', { error: 'Treasure not found' });
            }
    
            // Respond with the treasure data and HTTP status 200 (OK)
            res.status(200).render('treasurePage', { treasure });
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error fetching treasure:', e);
            res.status(500).render('internalServerErrorPage');
        }
    }
    

    // Handle the request to create a new treasure
    async createTreasure(req, res) {
        try {
            // Extract treasure data (name, desc, url) from the request body
            const { name, desc, url } = req.body;
            // Create a new treasure by calling the treasureService
            const newTreasure = await treasureService.createTreasure({ name, desc, url });
            // Respond with the newly created treasure and HTTP status 201 (Created)
            res.status(201).json(newTreasure);
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error creating treasure', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to update an existing treasure
    async updateTreasure(req, res) {
        try {
            // Parse the treasure ID (id) from the request parameters
            const id = parseInt(req.params.id, 10);
            // Extract updated treasure data (name, desc, url) from the request body
            const { name, desc, url } = req.body;
            // Update the treasure by calling the treasureService
            const success = await treasureService.updateTreasure(id, { name, desc, url });
            // If no treasure is updated, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({message: 'Treasure not found or no changes made'});
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({message: 'Treasure updated successfully'});
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error updating treasure', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to delete a treasure
    async deleteTreasure(req, res) {
        try {
            // Parse the treasure ID (id) from the request parameters
            const id = parseInt(req.params.id, 10);
            // Delete the treasure by calling the treasureService
            const success = await treasureService.deleteTreasure(id);
            // If the treasure does not exist, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({message: 'Treasure not found'});
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({message: 'Treasure deleted successfully'});
        } catch(e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error deleting treasure', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    async submitAnswer(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const { url } = req.body;

            const treasure = await treasureService.getTreasureById(id);

            if(!treasure) {
                res.status(404).render('treasuresPage', { treasure: null, message: 'Treasure not found' });
            }

            const isCorrect = await treasureService.checkAnswer(id, url);

            res.render('treasurePage', {
                treasure,
                message: isCorrect ? 'Correct Answer!' : 'Incorrect Answer! Try again...'
            });
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error submitting answer', e);
            // res.status(500).json({message: 'Internal server error'});
            res.status(500).render('internalServerErrorPage')
        }
    }
}

// Export an instance of the TreasureController class for use in routes
module.exports = new TreasureController();