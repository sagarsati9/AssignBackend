const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models"); 
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json()); // Ensure this is used for parsing JSON
app.use("/api/users", userRoutes); // Mount the route

db.sequelize.sync().then(() => {
  console.log("Database connected and synced");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
