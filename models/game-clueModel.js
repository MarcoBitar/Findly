// models/game-clueModel.js

class GameClue {
    // Constructor to initialize the GameClue instance
    constructor(gcid, game_id, clue_id) {
        this.gcid = gcid;           // Unique identifier for the GameClue relationship
        this.game_id = game_id;     // ID of the associated game
        this.clue_id = clue_id;     // ID of the associated clue
    }

    // Static method to create a GameClue object from a database row
    static fromRow(row) {
        return new GameClue(
            row.gameclue_id,      // Maps to the 'gameclue_id' column in the database row
            row.game_id,          // Maps to the 'game_id' column in the database row
            row.clue_id           // Maps to the 'clue_id' column in the database row
        );
    }
}

module.exports = GameClue; // Exporting the GameClue class to be used elsewhere