import { Model, DataTypes, Sequelize } from 'sequelize';

interface GadgetAttributes {
  id: string;
  name: string;
  status: 'Available' | 'Deployed' | 'Destroyed' | 'Decommissioned';
  decommissioned_at?: Date | null;
  mission_success_probability: number;
}

export class Gadget extends Model<GadgetAttributes> implements GadgetAttributes {
  public id!: string;
  public name!: string;
  public status!: 'Available' | 'Deployed' | 'Destroyed' | 'Decommissioned';
  public decommissioned_at?: Date | null;
  public mission_success_probability!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public async softDelete() {
    this.status = 'Decommissioned';
    this.decommissioned_at = new Date();
    await this.save();
  }
}

export const initGadgetModel = (sequelize: Sequelize) => {
  Gadget.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
        allowNull: false,
        defaultValue: "Available",
      },
      decommissioned_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      mission_success_probability: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: Math.random() * 100,
      },
    },
    {
      sequelize,
      modelName: 'Gadget',
      tableName: 'gadgets',
      timestamps: true,
    }
  );
};
