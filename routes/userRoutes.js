// routes/userRoutes.js

// Import necessary modules
const express = require('express');  // Import express to create the router
const userController = require('../controllers/userController');  // Import the userController to handle route logic
const { validateCreateUser, validateUpdateUser, validateUserLogin, validateUserId } = require('../validators/userDTO');  // Import validation functions for user DTO
const userService = require('../services/userService');

// Create a new router instance using express.Router()
const router = express.Router();

// Define the routes for handling user related HTTP requests

// GET request to fetch all users
router.get('/', (req, res) => userController.getAllUsers(req, res));

// GET request to fetch a specific user by their ID
router.get('/:id', validateUserId, (req, res) => userController.getUserById(req, res));

// POST request to create a new user
router.post('/', validateCreateUser, (req, res) => userController.createUser(req, res));

// POST request to login a user
router.post('/login', validateUserLogin, (req, res) => userController.checkLogin(req, res));

// PUT request to update an existing user by their ID
// router.put('/:id', [validateUserId, validateUpdateUser], (req, res) => userController.updateUser(req, res));
router.post('/update-user/:id', [validateUserId, validateUpdateUser], (req, res) => userController.updateUser(req, res));

// DELETE request to remove a user by their ID
// router.delete('/:id', validateUserId, (req, res) => userController.deleteUser(req, res));
router.get('/delete/:id', validateUserId, (req, res) => userController.deleteUser(req, res));

router.get('/edit/:id', (req,res)=> {
    res.render('editUserPage', { user: res.locals.user });
});

// Export the router instance to be used elsewhere
module.exports = router;