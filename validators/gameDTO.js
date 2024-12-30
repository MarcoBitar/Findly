//validators/gameDTO.js
const {body, param, validationResult} = require ('express-validator');

// Validation for creating/updating a game
const validateGame = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({max:40})
        .withMessage('Name must not exceed 40 characters'),

    body('type')
        .isString()
        .withMessage('Type must be a string')
        .notEmpty()
        .withMessage('Type is required')
        .isLength({max:20})
        .withMessage('Type must not exceed 20 characters'),

    body('desc')
        .isString()
        .withMessage('Description must be valid')
        .notEmpty()
        .withMessage('Description is required'),

    body('diff')
        .isString()
        .withMessage('Difficulty must be valid')
        .notEmpty()
        .withMessage('Difficulty is required')
        .isLength({max:14})
        .withMessage('Difficulty must not exceed 14 characters'),

    // Custom middleware to check for validation errors
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors .isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

// Validation for checking the 'id' parameter in the URL
const validateGameId = [
    param('id').isInt().withMessage('ID must be an integer'),

    // Custom middleware to check for validation errors
    (req,res,next) => {
        const errors = validationResult(req)
        if(!errors .isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {validateGame, validateGameId};