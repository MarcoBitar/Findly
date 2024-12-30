//validators/treasureDTO.js
const {body, param, validationResult} = require('express-validator');

// Validation for creating/updating a treasure
const validateTreasure = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({max:40})
        .withMessage('Name must not exceed 40 characters'),

    body('desc')
        .isString()
        .withMessage('Description must be valid')
        .notEmpty()
        .withMessage('Description is required'),

    body('url')
        .isURL()
        .withMessage('URL must be valid')
        .notEmpty()
        .withMessage('URL is required'),

    body('date')
        .optional()
        .isISO8601()
        .withMessage('Date_added must be valid'),

    // Custom middleware to check for validation errors
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

// Validation for checking the 'id' parameter in the URL
const validateTreasureId = [
    param('id').isInt().withMessage('ID must be an integer'),

    // Custom middleware to check for validation errors
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {validateTreasure, validateTreasureId};