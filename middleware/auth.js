const jwt = require("jsonwebtoken");
const config = require("../config/config");

verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.json({
      status: 0,
      message: "Please login to continue using the service.",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    console.log(err, "<<-- Error in jwt decoding");
    if (err != null) return res.status(500).send("Authentication Failed.");
    console.log("decoded", decoded);
    req.user = decoded.id.email;

    next();
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;

module.exports = authJwt;
