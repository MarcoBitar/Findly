// models/clueModel.js
const moment = require('moment'); // Importing the moment library for date formatting

class Clue {
    // Constructor for creating a new Clue instance
    constructor(id, ctext, date_i, treasure_id) {
        this.id = id;              // Unique identifier for the clue
        this.ctext = ctext;        // The text of the clue
        this.date_i = date_i;      // The date the clue was issued (formatted as YYYY-MM-DD)
        this.treasure_id = treasure_id; // The ID of the associated treasure
    }

    // Static method to create a Clue object from a database row
    static fromRow(row) {
        return new Clue(
            row.clue_id,                           // Maps to 'clue_id' in the database row
            row.clue_text,                         // Maps to 'clue_text' in the database row
            moment(row.date_issued).format("YYYY-MM-DD"), // Formats the date from the database using Moment.js
            row.treasure_id                        // Maps to 'treasure_id' in the database row
        );
    }
}

module.exports = Clue; // Exporting the Clue class to be used elsewhere