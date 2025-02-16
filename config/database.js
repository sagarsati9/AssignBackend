const { Sequelize } = require("sequelize");
const dbConfig = require("./config.json")["development"]; // Load DB config

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false, // Disable logging (optional)
  }
);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
})();

module.exports = sequelize;
