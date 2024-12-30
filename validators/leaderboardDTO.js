//validators/leaderboardDTO.js
const {body, param, validationResult} = require('express-validator');

// Validation for creating/updating a clue
const validateLeaderboard = [
    body('l_date')
        .optional()
        .isISO8601()
        .withMessage('Leaderboard Date must be valid'),
    body('points_e')
        .isInt()
        .withMessage('Points earned must be an integer')
        .notEmpty()
        .withMessage('Points earned is required'),
    body('user_id')
        .isInt()
        .withMessage('User_id must be an integer')
        .notEmpty()
        .withMessage('User_id is required'),

    // Custom middleware to check for validation errors
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors .isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

// Validation for checking the 'id' parameter in the URL
const validateLeaderboardId = [
    param('id').isInt().withMessage('ID must be an integer'),

    // Custom middleware to check for validation errors
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors .isEmpty()){
            return res.status(500).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {validateLeaderboard, validateLeaderboardId};