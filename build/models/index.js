"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gadget = exports.User = exports.sequelize = void 0;
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const process_1 = __importDefault(require("process"));
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const gadget_1 = require("./gadget");
Object.defineProperty(exports, "Gadget", { enumerable: true, get: function () { return gadget_1.Gadget; } });
const basename = path_1.default.basename(__filename);
const env = process_1.default.env.NODE_ENV || "development";
const config = require(path_1.default.join(__dirname, "../config/config.json"))[env];
const db = {};
const sequelize = new sequelize_1.Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
});
exports.sequelize = sequelize;
// Explicitly initialize models
(0, user_1.initUserModel)(sequelize);
(0, gadget_1.initGadgetModel)(sequelize);
// Assign models to db object
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
db.User = user_1.User;
db.Gadget = gadget_1.Gadget;
exports.default = db;
