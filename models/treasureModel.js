// models/treasureModel.js
const moment = require('moment');  // Import the moment library to handle date formatting

class Treasure {
    // Constructor to initialize a Treasure instance
    constructor(id, name, desc, url, date) {
        this.id = id;        // The unique ID of the treasure
        this.name = name;    // The name of the treasure
        this.desc = desc;    // A description of the treasure
        this.url = url;      // A URL pointing to the treasure (e.g., an image or page link)
        this.date = date;    // The date the treasure was added (formatted as "YYYY-MM-DD")
    }

    // Static method to create a Treasure object from a database row
    static fromRow(row) {
        return new Treasure(
            row.treasure_id,              // Maps to 'treasure_id' column in the database
            row.treasure_name,            // Maps to 'treasure_name' column
            row.treasure_description,     // Maps to 'treasure_description' column
            row.treasure_url,             // Maps to 'treasure_url' column
            moment(row.date_added).format("YYYY-MM-DD")  // Format the 'date_added' to "YYYY-MM-DD"
        );
    }
}

module.exports = Treasure;  // Export the Treasure class to be used in other parts of the application