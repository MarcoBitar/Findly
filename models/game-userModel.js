// models/game-userModel.js
const moment = require('moment');

class GameUser {
    // Constructor to initialize a GameUser instance
    constructor(guid, game_id, user_id, score, status, date_c) {
        this.guid = guid;          // Unique identifier for the GameUser relationship
        this.game_id = game_id;    // ID of the associated game
        this.user_id = user_id;    // ID of the associated user
        this.score = score;        // Score achieved by the user in the game
        this.status = status;      // Status of the user's participation in the game (e.g., "completed", "in-progress")
        this.date_c = date_c;      // Date when the user completed the game
    }

    // Static method to create a GameUser object from a database row
    static fromRow(row) {
        return new GameUser(
            row.gameuser_id,         // Maps to the 'gameuser_id' column in the database row
            row.game_id,             // Maps to the 'game_id' column in the database row
            row.user_id,             // Maps to the 'user_id' column in the database row
            row.score,               // Maps to the 'score' column in the database row
            row.status,              // Maps to the 'status' column in the database row
            moment(row.date_completed).format("YYYY-MM-DD") // Format the date_completed field
        );
    }
}

module.exports = GameUser;  // Exporting the GameUser class to be used elsewhere