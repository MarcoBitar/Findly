// models/userModel.js

class User {
  constructor(id, name, email, pass, points, rewards) {
      this.id = id;           // Unique user identifier
      this.name = name;       // Username
      this.email = email;     // User's email address
      this.pass = pass;       // User's password (should be hashed)
      this.points = points;   // User's accumulated points
      this.rewards = rewards; // User's rewards (could be points, badges, etc.)
  }

  // Static method to map a database row to a User object
  static fromRow(row) {
      return new User(
          row.user_id,       // Maps to the 'user_id' column in the database
          row.username,      // Maps to the 'username' column
          row.user_email,    // Maps to the 'user_email' column
          row.user_password, // Maps to the 'user_password' column
          row.user_points,   // Maps to the 'user_points' column
          row.user_rewards   // Maps to the 'user_rewards' column
      );
  }
}

module.exports = User;  // Export the User model for use in other parts of the application