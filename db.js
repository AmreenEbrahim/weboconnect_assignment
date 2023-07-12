const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://amreen:amreens12@localhost:5432/assignmentdb"
);

async function connectDB() {
  try {
    const myPromise = new Promise(async (resolve, reject) => {
      try {
        await sequelize.authenticate();
        resolve(true);
      } catch (error) {
        console.error("Unable to connect to the database:", error);
        resolve(error);
      }
    });

    myPromise
      .then(() => {
        // await sequelize.sync({ alter: true });
        console.log(
          "Connection to database has been established successfully."
        );
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
    //   console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
module.exports = { connectDB, sequelize };
