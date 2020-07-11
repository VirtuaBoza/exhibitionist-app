import jwt from "express-jwt";
import jwks from "jwks-rsa";

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://exhibitionist-dev.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:8000",
  issuer: "https://exhibitionist-dev.us.auth0.com/",
  algorithms: ["RS256"],
});

export default jwtCheck;
