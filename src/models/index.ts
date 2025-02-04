import path from "path";
import { Sequelize } from "sequelize";
import process from "process";
import { initUserModel, User } from "./user";
import { initGadgetModel, Gadget } from "./gadget";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname, "../config/config.json"))[env];

interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: typeof User;
  Gadget: typeof Gadget;
}

const db = {} as DbInterface;

// Initialize Sequelize instance
let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable] as string, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Explicitly initialize models
initUserModel(sequelize);
initGadgetModel(sequelize);

// Assign models to db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Gadget = Gadget;


export default db;
export { sequelize, User, Gadget };
