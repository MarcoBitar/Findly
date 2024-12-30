# Findly-API

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Database Structure](#database-structure)
4. [Getting Started](#getting-started)
5. [Prerequisites](#prerequisites)
6. [Installation](#installation)
7. [Usage](#usage)

---

## Project Overview
**Findly** is a comprehensive API designed to entertain users by solving riddles and getting clues to find hidden treasures in other websites.

## Features
- User management and authentication.
- Game management and scoring.
- Treasure verification and collection.
- Reaching achievements.
- Track user performance on games and pinning the top performers on a leaderboard.
- CRUD operations on relationships between users, games, treasures, clues, achievements and their relationships.

## Database Structure
Findly's database consists of 10 tables that store data for users, games, treasures, clues, achievements and their relationships. Here’s an overview:

1. **Users** - Stores user information and authentication data.
2. **Games** - Details about gmes/riddles user can solve.
3. **Treasures** - Weekly treasures that users must find.
4. **CLues** - Hints to where treasures could be hidden.
5. **Achievements** - Badges that users can get after accomplishing a milestone.
6. **Leaderboards** - Daily leaderboards that classifies users who found certain treasures.
7. **Users-Treasures** - Links users to specific treasures they have found.
8. **Users-Achievements** - Tracks user's milestones.
9. **Games-Users** - Links games to users.
10. **Games-Clues** - Links games to clues.

---

## Getting Started
Follow these instructions to set up and run the Findly project locally.

### Prerequisites
- **Node.js** and **npm**: Make sure you have Node.js (v14 or later) and npm installed.
- **MySQL**: A MySQL server instance for database management.
- **Git**: To clone and manage the repository.

### Installation
1. **Clone the repository**:
    ```bash
    git clone https://github.com/MarcoBitar/Findly-API
    ```

2. **Install dependencies**:
    The project relies on several key packages. To install them, run:

    ```bash
    npm install
    ```
    - **dotenv**
    - **express**
    - **express-session**
    - **express-validator**
    - **moment**
    - **mysql2**
    - **nodemon**

3. **Set up environment variables**:
    - Create a `.env` file in the root directory.
    - Add the following configurations:
      ```plaintext
      DB_HOST=your_db_host
      DB_USER=your_db_user
      DB_PASSWORD=your_db_password
      DB_NAME=your_db_name
      PORT=your_preferred_port
      ```

4. **Initialize the Database**:
   Use the database schema file provided (Findly(DB)) to create tables and initialize your MySQL database.

### Usage
To start the server, run:
```bash
npm run dev
```

### Front-End Integration
The front-end provides an intuitive interface for users to enjoy a treasure hunt game, earn treasures and achievements along the way

1. **Views**:
All EJS views are located in the `/views` folder, which includes:
- `welcomePage.ejs`: For the welcome page.
- `aboutusPage.ejs`: For the About Us page.
- `termsPage.ejs`: For the Findly Terms.
- `404Page.ejs`: For the 404 error page.
- `achievementPage.ejs`: For individual achievement details.
- `achievementsPage.ejs`: For the list of achievements.
- `cluePage.ejs`: For clues provided in games.
- `editUserPage.ejs`: For editing user profiles.
- `gamePage.ejs`: For game details.
- `gamesPage.ejs`: For the list of games.
- `internalServerErrorPage.ejs`: For internal server error page.
- `leaderboardPage.ejs`: For displaying the leaderboard.
- `loginPage.ejs`: For the login page.
- `privacyPage.ejs`: For the privacy policy page.
- `signupPage.ejs`: For the signup page.
- `treasurePage.ejs`: For individual treasure details.
- `treasuresPage.ejs`: For the list of treasures.
- `userProfilePage.ejs`: For user profile details.

2. **Styling**:
All CSS stylesheets are located in the `/css` folder, which includes:
    - `welcomePage.css`: Styles for the welcome page. 
    - `aboutusPage.css`: Styles for the About Us page.
    - `termsPage.css`: Styles for the Findly Terms. 
    - `404Page.css`: Styles for the 404 error page.
    - `achievementPage.css`: Styles for individual achievement details.
    - `achievementsPage.css`: Styles for the list of achievements. 
    - `cluePage.css`: Styles for clues provided in games. 
    - `editUserPage.css`: Styles for editing user profiles. 
    - `gamePage.css`: Styles for game details. 
    - `gamesPage.css`: Styles for the list of games. 
    - `internalServerErrorPage.css`: Styles for the internal server error page. 
    - `leaderboardPage.css`: Styles for displaying the leaderboard. 
    - `loginPage.css`: Styles for the login page. 
    - `privacyPage.css`: Styles for the privacy policy page. 
    - `signupPage.css`: Styles for the signup page.
    - `treasurePage.css`: Styles for individual treasure details. 
    - `treasuresPage.css`: Styles for the list of treasures. 
    - `userProfilePage.css`: Styles for user profile details. 
    
Additionally, there are two folders within the `css` directory: 
    - `audio/`: Contains audio files used in the project.
    - `images/`: Contains image files used in the project.

For additional questions or issues, please refer to the documentation or contact the repository.
