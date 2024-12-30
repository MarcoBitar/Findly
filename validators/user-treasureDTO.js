//validators/user-treasureDTO.js
const {body, param, validationResult} = require('express-validator');

// Validation for creating/updating a user treasure
const validateUserTreasure = [
    body('user_id')
        .isInt()
        .withMessage('User ID must be an integer')
        .notEmpty()
        .withMessage('User ID is required'),

    body('treasure_id')
        .isInt()
        .withMessage('Treasure ID must be an integer')
        .notEmpty()
        .withMessage('Treasure ID is required'),

    body('is_v')
        .isBoolean()
        .withMessage('Is verified must be valid')
        .notEmpty()
        .withMessage('is Verified is required'),

    body('date_f')
        .optional()
        .isISO8601()
        .withMessage('Date_found must be valid'),

    // Custom middleware to check for validation errors
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

// Validation for checking the 'utid' parameter in the URL
const validateUserTreasureId = [
    param('utid').isInt().withMessage('User Treasure ID must be an integer'),

    // Custom middleware to check for validation errors
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {validateUserTreasure, validateUserTreasureId};