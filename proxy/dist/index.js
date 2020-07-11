"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const hasuraProxy_1 = __importDefault(require("./hasuraProxy"));
const app = express_1.default();
app.use("/graphql", hasuraProxy_1.default);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map