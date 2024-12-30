//validators/achievementDTO.js
const { body, param, validationResult } = require('express-validator');  // Import necessary functions from express-validator

// Validation for creating/updating an achievement
const validateAchievement = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 40 })
        .withMessage('Name must not exceed 40 characters'),

    body('category')
        .isString()
        .withMessage('Category must be a string')
        .notEmpty()
        .withMessage('Category is required')
        .isLength({ max: 20 })
        .withMessage('Category must not exceed 20 characters'),

    body('descr')
        .isString()
        .withMessage('Description must be a string')
        .notEmpty()
        .withMessage('Description is required'),

    body('pointsr')
        .isInt()
        .withMessage('Points_required must be an integer')
        .notEmpty()
        .withMessage('Points_required is required'),

    // Custom middleware to check validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for checking the 'id' parameter in the URL
const validateAchievementById = [
    param('id').isInt().withMessage('ID must be an integer'),

    // Custom middleware to check validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateAchievement, validateAchievementById };