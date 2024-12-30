//server.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require('express-session');

// Configuring dotenv to use environment variables
dotenv.config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'Marco_Bitar',
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});


// Importing route modules
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const treasureRoutes = require('./routes/treasureRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const clueRoutes = require('./routes/clueRoutes');
const gameUserRoutes = require('./routes/game-userRoutes');
const userTreasureRoutes = require('./routes/user-treasureRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const userAchievementRoutes = require('./routes/user-achievementRoutes');
const gameClueRoutes = require('./routes/game-clueRoutes');

// Defining routes for various endpoints
app.use('/Findly/users', userRoutes);
app.use('/Findly/games', gameRoutes);
app.use('/Findly/treasures', treasureRoutes);
app.use('/Findly/achievements', achievementRoutes);
app.use('/Findly/clues', clueRoutes);
app.use('/Findly/games-users', gameUserRoutes);
app.use('/Findly/users-treasures', userTreasureRoutes);
app.use('/Findly/leaderboards', leaderboardRoutes);
app.use('/Findly/users-achievements', userAchievementRoutes);
app.use('/Findly/games-clues', gameClueRoutes);

// Serve static files (like CSS and images) from the 'css' folder
app.use('/css',express.static(path.join(__dirname, 'css')));

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Root route for the API
app.get('/Findly', (req, res) => {
    res.render('welcomePage');
});

app.get('/Findly/aboutus', (req, res) => {
    res.render('aboutusPage');
});

app.get('/Findly/contactus', (req, res) => {
    res.render('contactusPage');
});

app.get('/Findly/signup', (req, res) => {
    res.render('signupPage');
});

app.get('/Findly/login', (req, res) => {
    res.render('loginPage');
});

app.get('/Findly/privacy', (req, res) => {
    res.render('privacyPage');
});

app.get('/Findly/terms', (req, res) => {
    res.render('termsPage');
});

// Middleware to handle undefined routes (404 errors)
app.use((req, res, next) => {
    // res.status(404).json({ message: 'Endpoint not found' });
    res.status(404).render('404Page');
});

// Global error handler for unhandled errors
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    // res.status(500).json({ message: 'Internal server error' });
    res.status(500).render('internalServerErrorPage');
});

// Defining the port from the environment variables
const PORT = process.env.PORT;

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});