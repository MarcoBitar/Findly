//validators/userValidator.js
const {body, param, validationResult} = require ('express-validator');

// Validation for creating a user
const validateCreateUser = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({max:40})
        .withMessage('Name must not exceed 40 characters'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid')
        .notEmpty()
        .withMessage('Email is required'),
    body('pass')
        .isString()
        .withMessage('Pass must be valid')
        .notEmpty()
        .withMessage('Pass is required')
        .isLength({max:10})
        .withMessage('Password must not exceed 10 characters'),
    body('points')
        .optional()
        .isInt()
        .withMessage('Points must be an integer'),
    body('rewards')
        .optional()
        .isInt()
        .withMessage('Rewards must be an integer'),

    // Custom middleware to check for validation errors
    (req,res,next)=> {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

// Validation for updating a user
const validateUpdateUser = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({max:40})
        .withMessage('Name must not exceed 40 characters'),

    body('email')
        .isEmail()
        .withMessage('Email must be valid')
        .notEmpty()
        .withMessage('Email is required'),

    body('pass')
        .isString()
        .withMessage('Pass must be valid')
        .notEmpty()
        .withMessage('Pass is required')
        .isLength({max:10})
        .withMessage('Password must not exceed 10 characters'),

    body('points')
        .isInt()
        .withMessage('Points must be an integer')
        .notEmpty()
        .withMessage('Points are required'),

    body('rewards')
        .isInt()
        .withMessage('Rewards must be an integer')
        .notEmpty()
        .withMessage('rewards are required'),

    // Custom middleware to check for validation errors
    (req,res,next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

// Validation for user login
const validateUserLogin = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),

    body('pass')
        .isString()
        .withMessage('Password must be a valid')
        .notEmpty()
        .withMessage('Password is required'),

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
const validateUserId = [
    param('id').isInt().withMessage('ID must be an integer'),

    // Custom middleware to check for validation errors
    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {validateCreateUser, validateUpdateUser, validateUserLogin, validateUserId};