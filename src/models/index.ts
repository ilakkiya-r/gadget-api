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
if (process.env.DATABASE_URL) {
  
  sequelize = new Sequelize(process.env.DATABASE_URL as string, {
    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,  
        rejectUnauthorized: false, 
      },
    },
  });
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

// Sync models before using them
sequelize
  .sync({ force: false }) 
  .then(() => console.log("Database & tables synced successfully"))
  .catch((err) => console.error("Sequelize sync error:", err));

export default db;
export { sequelize, User, Gadget };
