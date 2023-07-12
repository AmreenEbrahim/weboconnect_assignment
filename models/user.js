const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const User = sequelize.define(
  "User",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      values: ["male", "female", "transgender"],
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true, //checks for email format
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["active", "pending", "de-active"],
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    // sequelize, // We need to pass the connection instance
    // modelName: 'User' // We need to choose the model name
    freezeTableName: true, //create a model named User pointing to a table also named User.
    // timestQxxxxamps: false//add rimestamp
    // don't forget to enable timestamps!
    timestamps: true,

    // want createdAt
    createdAt: true,

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: "updateTimestamp",
  }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
// await User.sync({ alter: true });

module.exports = User;
