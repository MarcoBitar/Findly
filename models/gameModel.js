// models/gameModel.js

class Game {
    // Constructor to initialize a Game instance
    constructor(id, name, type, desc, diff) {
        this.id = id;         // The unique ID of the game
        this.name = name;     // Name of the game
        this.type = type;     // Type of the game (e.g., "puzzle", "action")
        this.desc = desc;     // Description of the game
        this.diff = diff;     // Difficulty level of the game (e.g., "easy", "medium", "hard")
    }

    // Static method to create a Game object from a database row
    static fromRow(row) {
        return new Game(
            row.game_id,             // Maps to 'game_id' column in the database
            row.game_name,           // Maps to 'game_name' column in the database
            row.game_type,           // Maps to 'game_type' column in the database
            row.game_description,    // Maps to 'game_description' column in the database
            row.game_difficulty      // Maps to 'game_difficulty' column in the database
        );
    }
}

module.exports = Game;  // Export the Game class to be used elsewhere