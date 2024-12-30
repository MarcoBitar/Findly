//validators/game-userDTO.js
const { body, param, validationResult } = require('express-validator');

// Validation for creating/updating a game-user relationship
const validateGameUser = [
    body('game_id')
        .isInt()
        .withMessage('Game ID must be an integer')
        .notEmpty()
        .withMessage('Game ID is required'),

    body('user_id')
        .isInt()
        .withMessage('User ID must be an integer')
        .notEmpty()
        .withMessage('User ID is required'),

    body('score')
        .isInt()
        .withMessage('Score must be an integer')
        .notEmpty()
        .withMessage('Score is required'),

    body('status')
        .isIn(['Completed', 'Not Completed'])
        .withMessage('Status must be valid')
        .notEmpty()
        .withMessage('Status is required'),

    body('date_c')
        .optional()
        .isISO8601()
        .withMessage('Date_completed must be valid'),

    // Custom middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for checking the 'guid' parameter in the URL
const validateGameUserId = [
    param('guid')
        .isInt()
        .withMessage('Game User ID must be an integer'),

    // Custom middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateGameUser, validateGameUserId };