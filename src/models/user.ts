import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  role: "admin" | "agent" | "technician";
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: "admin" | "agent" | "technician";
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      role: {
        type: DataTypes.ENUM("admin", "agent", "technician"), // Define ENUM roles
        allowNull: false,
        defaultValue: "agent", // Default role
      },
      
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );
};
