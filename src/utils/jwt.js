const expressJwt = require("express-jwt");
const { JWT_CONSTANT_SECRET } = require("../utils/config");
const authService = require("../auth/auth.service");

module.exports = jwt;

function jwt() {
  const secret = JWT_CONSTANT_SECRET;
  return expressJwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/auth/login",
      "/auth/register",
    ],
  });
}

async function isRevoked(req, payload, done) {
  const user = await authService.getById(payload.sub);

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true);
  }

  done();
}
