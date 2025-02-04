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
  sequelize = new Sequelize(process.env.DB_NAME || config.database, 
    process.env.DB_USERNAME || config.username, 
    process.env.DB_PASSWORD || config.password, 
    {
      host: process.env.DB_HOST || config.host,
      dialect: config.dialect,
    });
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

