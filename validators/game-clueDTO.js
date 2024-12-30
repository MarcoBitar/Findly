//validators/game-clueDTO.js
const { body, param, validationResult } = require('express-validator');

// Validation for creating/updating a game-clue relationship
const validateGameClue = [
    body('game_id')
        .isInt()
        .withMessage('Game ID must be an integer')
        .notEmpty()
        .withMessage('Game ID is required'),
    
    body('clue_id')
        .isInt()
        .withMessage('Clue ID must be an integer')
        .notEmpty()
        .withMessage('Clue ID is required'),
    
    // Custom middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for checking the 'gcid' parameter in the URL
const validateGameClueId = [
    param('gcid')
        .isInt()
        .withMessage('Game Clue ID must be an integer'),
    
    // Custom middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateGameClue, validateGameClueId };