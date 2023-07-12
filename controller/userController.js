//importing modules
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const config = require("../config/config");

//helpers

const { UploadFile } = require("../middleware/helper");

//Models
const User = require("../models/user");

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    let tokenSign = { email };
    let token = jwt.sign({ id: tokenSign }, config.secret, {
      expiresIn: 1 * 24 * 60 * 60 * 1000,
    });
    const data = {
      name,
      email,
      status: "pending",
      gender,
      password: await bcrypt.hash(password, 10),
      token,
    };

    //saving the user
    const user = await User.create(data);

    //if user details is captured

    if (user) {
      console.log("user", JSON.stringify(user, null, 2));
      console.log(token);
      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
    return res.status(409).send("Details are not correct");
  }
};

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        let tokenSign = { email };
        let token = jwt.sign({ id: tokenSign }, config.secret, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        User.update(
          { token },
          {
            where: {
              email: email,
            },
          }
        );

        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send user data
        return res.status(201).send(user);
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const file = req.files;
    const id = req.user;
    if (file && file.length > 0) {
      // //////Middleware to upload image////////////
      // ////////////////////////////////////////////////////////
      let stored = await UploadFile(file, id, response);
      req.body.profile_pic = stored.Location;
    }
    //find a user by their email
    await User.update(
      { ...req.body },
      {
        where: {
          email: id,
        },
      }
    )
      .then((user) => {
        return res.status(201).send(user);
        // res.json({
        //   status: 1,
        //   data: role,
        // });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("error");
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("error");
  }
};

const findAllUsers = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const users = await User.findAll({ limit, offset: skip });

    res.status(200).json({
      status: "success",
      results: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({
      where: { id: req.params.id },
      force: true,
    });

    if (result === 0) {
      return res.status(404).send("user with ID not found");
    }

    res.status(204).send("success");
  } catch (error) {
    res.status(500).send("error");
  }
};

module.exports = {
  signup,
  login,
  updateUser,
  findAllUsers,
  deleteUser,
};
