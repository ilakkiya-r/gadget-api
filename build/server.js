"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./routes/index"));
// Load environment variables from .env file
dotenv_1.default.config();
// Create an Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Define the Sequelize connection
const sequelize = new sequelize_1.Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT || '5432', 10), // Default PostgreSQL port
});
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Test route to check if the server is running
app.get('/api/test', (req, res) => {
    res.json({ message: "Server is running!" });
});
// API routes
app.use('/api', (0, index_1.default)());
// Sync Sequelize models and start the server
sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
