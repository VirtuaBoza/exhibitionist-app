import jwt from "express-jwt";
import jwks from "jwks-rsa";

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://exhibitionist-dev.us.auth0.com/.well-known/jwks.json",
  }),
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: "https://exhibitionist-dev.us.auth0.com/",
  algorithms: ["RS256"],
});

export default jwtCheck;
