//validators/user-achievementDTO.js
const {body, param, validationResult} = require('express-validator');

// Validation for creating/updating a user achievement
const validateUserAchievement = [
    body('user_id')
        .isInt()
        .withMessage('User ID must be an integer')
        .notEmpty()
        .withMessage('User ID is required'),

    body('achievement_id')
        .isInt()
        .withMessage('Achievement ID must be an integer')
        .notEmpty()
        .withMessage('Achievement ID is required'),

    body('date_r')
        .optional()
        .isISO8601()
        .withMessage('Date_received must be valid'),

    // Custom middleware to check for validation errors
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

// Validation for checking the 'uaid' parameter in the URL
const validateUserAchievementId = [
    param('uaid').isInt().withMessage('User Achievement ID must be an integer'),

    // Custom middleware to check for validation errors
    (req,res,next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(500).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {validateUserAchievement, validateUserAchievementId};