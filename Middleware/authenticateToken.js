const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.SECRET_KEY_TO_ACCESS, (err, id) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.id = id;
    next();
  });
}

module.exports = { authenticateToken };
