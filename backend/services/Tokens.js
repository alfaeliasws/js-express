const jwt = require("jsonwebtoken");
require("crypto").randomBytes(64).toString("hex");
let success = 1;
let status = 200;
let msg = "Success";
let userDetail = {};
let newToken = {};

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: "8000s",
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET).then(() => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

function reCreate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  // jwt.decode(token, process.env.TOKEN_SECRET).then(() => {});
  try {
    decodedToken = jwt.decode(token, process.env.TOKEN_SECRET);
    userDetail = decodedToken.tokenContent;
    newToken = generateAccessToken({ userDetail });
  } catch (error) {
    console.log(error);
  }
  return {
    success,
    status,
    msg,
    token: newToken,
  };
}

module.exports = {
  generateAccessToken,
  authenticateToken,
  reCreate,
};
