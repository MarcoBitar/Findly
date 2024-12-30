// models/user-treasureModel.js
const moment = require('moment');  // Import moment to format date

class UserTreasure {
    // Constructor to initialize a UserTreasure instance
    constructor(utid, user_id, treasure_id, is_v, date_f) {
        this.utid = utid;            // The unique ID of the user-treasure relationship
        this.user_id = user_id;      // The ID of the user who found the treasure
        this.treasure_id = treasure_id;  // The ID of the treasure
        this.is_v = is_v;            // Whether the treasure is verified (true or false)
        this.date_f = date_f;        // The date the treasure was found (formatted as "YYYY-MM-DD")
    }

    // Static method to create a UserTreasure object from a database row
    static fromRow(row) {
        return new UserTreasure(
            row.usertreasure_id,  // Maps to 'usertreasure_id' column in the database
            row.user_id,          // Maps to 'user_id' column
            row.treasure_id,      // Maps to 'treasure_id' column
            row.is_verified,      // Maps to 'is_verified' column (boolean)
            moment(row.date_found).format("YYYY-MM-DD") // Format the 'date_found' column to "YYYY-MM-DD"
        );
    }
}

module.exports = UserTreasure;  // Export the UserTreasure class for use elsewhere in the app