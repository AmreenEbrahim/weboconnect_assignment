const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");
const userRoutes = require("./routes/userRoutes");
const app = express();
const port = 3333;

//middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.connectDB();
//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
  console.log("db has been re sync");
});
//routes for the user API
app.use("/api", userRoutes);
app.listen(port, () => {
  console.log("App running on port", port);
});
