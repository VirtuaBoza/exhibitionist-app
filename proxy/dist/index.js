"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const hasuraProxy_1 = __importDefault(require("./hasuraProxy"));
const jwtCheck_1 = __importDefault(require("./jwtCheck"));
const auth_1 = __importDefault(require("./routes/auth"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use("/private", jwtCheck_1.default);
app.use("/private", (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("invalid token...");
    }
});
app.use("/graphql", hasuraProxy_1.default);
app.use("/auth", auth_1.default);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map