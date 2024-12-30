//validators/clueDTO.js
const { body, param, validationResult } = require('express-validator');

// Validation for creating/updating a clue
const validateClue = [
    body('ctext')
        .isString()
        .withMessage('Clue text must be a string')
        .notEmpty()
        .withMessage('Clue text is required'),

    body('date_i')
        .optional()
        .isISO8601()
        .withMessage('Date must be a valid ISO 8601 date'),

    body('treasure_id')
        .isInt()
        .withMessage('Treasure_id must be an integer')
        .notEmpty()
        .withMessage('Treasure_id is required'),

    // Custom middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for checking the 'id' parameter in the URL
const validateClueId = [
    param('id')
        .isInt()
        .withMessage('ID must be an integer'),

    // Custom middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateClue, validateClueId };