// models/user-achievementModel.js
const moment = require('moment');  // Import the moment library to handle date formatting

class UserAchievement {
    // Constructor to initialize a UserAchievement instance
    constructor(uaid, user_id, achievement_id, date_r) {
        this.uaid = uaid;             // The unique ID of the user achievement (primary key)
        this.user_id = user_id;       // The ID of the user who earned the achievement
        this.achievement_id = achievement_id;  // The ID of the achievement earned
        this.date_r = date_r;         // The date the achievement was received (formatted as "YYYY-MM-DD")
    }

    // Static method to create a UserAchievement object from a database row
    static fromRow(row) {
        return new UserAchievement(
            row.userachievement_id,     // Maps to 'userachievement_id' column in the database
            row.user_id,                // Maps to 'user_id' column
            row.achievement_id,         // Maps to 'achievement_id' column
            moment(row.date_received).format("YYYY-MM-DD") // Format the 'date_received' to "YYYY-MM-DD"
        );
    }
}

module.exports = UserAchievement;  // Export the UserAchievement class to be used in other parts of the application