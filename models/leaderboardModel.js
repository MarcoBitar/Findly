// models/leaderboardModel.js
const moment = require('moment');  // Import the moment library for date manipulation

class Leaderboard {
    // Constructor to initialize a Leaderboard instance
    constructor(id, l_date, points_e, user_id) {
        this.id = id;             // The unique ID for the leaderboard entry
        this.l_date = l_date;     // The date of the leaderboard entry (formatted to YYYY-MM-DD)
        this.points_e = points_e; // The points earned by the user
        this.user_id = user_id;   // The ID of the user associated with this leaderboard entry
    }

    // Static method to create a Leaderboard object from a database row
    static fromRow(row) {
        return new Leaderboard(
            row.leaderboard_id,               // Maps to 'leaderboard_id' column in the database
            moment(row.leaderboard_date).format("YYYY-MM-DD"),  // Format the 'leaderboard_date' to YYYY-MM-DD
            row.points_earned,                // Maps to 'points_earned' column in the database
            row.user_id                       // Maps to 'user_id' column in the database
        );
    }
}

module.exports = Leaderboard;  // Export the Leaderboard class to be used elsewhere