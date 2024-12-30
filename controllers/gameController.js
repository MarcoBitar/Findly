// controllers/gameController.js

// Import gameService to handle game-related operations (CRUD)
const gameService = require('../services/gameService');

class GameController {

    // Handle the request to get all games
    async getAllGames(req, res) {
        try {
            // Fetch all games from the gameService
            const games = await gameService.getAllGames();
            const data = {
                games: games
            }
            // Respond with the games data and HTTP status 200 (OK)
            //res.status(200).json(games);
            res.render('gamesPage', data);
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            // console.error('Error fetching games:', e);
            // res.status(500).json({ message: 'Internal server error' });
            res.status(500).render('internalServerErrorPage');
        }
    }

    // Handle the request to get a specific game by its ID
    async getGameById(req, res) {
        try {
            // Parse the game ID (id) from the request parameters
            const id = parseInt(req.params.id, 10);
    
            // Fetch the game by ID using the gameService
            const game = await gameService.getGameById(id);
            // If the game is not found, respond with 404 (Not Found)
            if (!game) {
                return res.status(404).render('gamesPage', { error: 'Game not found' });
            }
             const showClueButton = false;
            // Respond with the game data and HTTP status 200 (OK)
            res.status(200).render('gamePage',  { game, showClueButton });
        } catch (e) {
            // Log the error for debugging
            console.error('Error fetching game:', e);
    
            // Respond with status 500 (Internal Server Error)
            console.log('Rendering gamesPage with error message');
            res.status(500).render('internalServerErrorPage');
        }
    }
    

    // Handle the request to create a new game
    async createGame(req, res) {
        try {
            // Extract data (name, type, desc, diff) from the request body
            const { name, type, desc, diff } = req.body;
            // Create a new game using the gameService
            const newGame = await gameService.createGame({ name, type, desc, diff });
            // Respond with the newly created game and HTTP status 201 (Created)
            res.status(201).json(newGame);
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error creating game', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to update an existing game
    async updateGame(req, res) {
        try {
            // Parse the game ID (id) from the request parameters
            const id = parseInt(req.params.id, 10);
            // Extract updated data (name, type, desc, diff) from the request body
            const { name, type, desc, diff } = req.body;
            // Update the game entry by calling the gameService
            const success = await gameService.updateGame(id, { name, type, desc, diff });
            // If the game entry does not exist or no changes were made, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Game not found or no changes made' });
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Game updated successfully' });
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error updating game', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    // Handle the request to delete a game
    async deleteGame(req, res) {
        try {
            // Parse the game ID (id) from the request parameters
            const id = parseInt(req.params.id, 10);
            // Delete the game entry by calling the gameService
            const success = await gameService.deleteGame(id);
            // If the game entry is not found, respond with 404 (Not Found)
            if (!success) {
                return res.status(404).json({ message: 'Game not found' });
            }
            // Respond with a success message and HTTP status 200 (OK)
            res.status(200).json({ message: 'Game deleted successfully' });
        } catch (e) {
            // If an error occurs, log the error and respond with status 500 (Internal Server Error)
            console.error('Error deleting game', e);
            res.status(500).json('internalServerErrorPage');
        }
    }

    async submitAnswer(req, res) {
        try {
            // Parse the game ID from the URL parameter
            const id = parseInt(req.params.id, 10);

            // Retrieve the answer (name) from the form submission
            const { name } = req.body;

            // Fetch the game by its ID using the gameService
            const game = await gameService.getGameById(id);
    
            // If no game is found, respond with HTTP status 404 (Not Found)
            if (!game) {
                return res.status(404).render('gamesPage', { game: null, message: 'Game not found' });
            }
    
            // Check if the submitted answer is correct using gameService
            const isCorrect = await gameService.checkAnswer(id, name);
    
            // Determine if the clue button should be shown based on the answer correctness
            const showClueButton = isCorrect;
    
            const data = {
                game,
                message: isCorrect ? 'Correct Answer!' : 'Incorrect Answer! Try again...',
                showClueButton
            }
            // Render the game page with the appropriate message and the showClueButton variable
            res.render('gamePage', data);
        } catch (e) {
            // If an error occurs, log it and respond with status 500 (Internal Server Error)
            console.error('Error submitting answer:', e);  // Log the error
            res.status(500).render('internalServerErrorPage');
        }
    }
    
}

// Export an instance of the GameController class for use in routes
module.exports = new GameController();