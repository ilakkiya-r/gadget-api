"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const models_1 = __importDefault(require("./models"));
const index_1 = __importDefault(require("./routes/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.DB_PORT || 5432;
// Middleware to parse JSON bodies
app.use(express_1.default.json());
//testing
app.get('/api/test', (req, res) => {
    res.json({ message: "Server is running!" });
});
app.use('/api', (0, index_1.default)());
(_a = models_1.default.sequelize) === null || _a === void 0 ? void 0 : _a.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
