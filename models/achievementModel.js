// models/achievementModel.js

class Achievement {
    // Constructor for creating a new Achievement instance
    constructor(id, name, category, descr, pointsr) {
        this.id = id;          // Unique identifier for the achievement
        this.name = name;      // Name of the achievement
        this.category = category; // Category to which the achievement belongs
        this.descr = descr;    // Description of the achievement
        this.pointsr = pointsr; // Points required to earn the achievement
    }

    // Static method to create an Achievement object from a database row (a database result)
    static fromRow(row) {
        return new Achievement(
            row.achievement_id,           // Maps to 'achievement_id' in the database row
            row.achievement_name,         // Maps to 'achievement_name' in the database row
            row.achievement_category,     // Maps to 'achievement_category' in the database row
            row.achievement_description,  // Maps to 'achievement_description' in the database row
            row.points_required           // Maps to 'points_required' in the database row
        )
    }
}

module.exports = Achievement; // Exports the Achievement class to be used elsewhere