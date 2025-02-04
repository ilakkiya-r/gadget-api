"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGadgetModel = exports.Gadget = void 0;
const sequelize_1 = require("sequelize");
class Gadget extends sequelize_1.Model {
    softDelete() {
        return __awaiter(this, void 0, void 0, function* () {
            this.status = 'Decommissioned';
            this.decommissioned_at = new Date();
            yield this.save();
        });
    }
}
exports.Gadget = Gadget;
const initGadgetModel = (sequelize) => {
    Gadget.init({
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM('Available', 'Deployed', 'Destroyed', 'Decommissioned'),
            allowNull: false,
            defaultValue: "Available",
        },
        decommissioned_at: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        mission_success_probability: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
            defaultValue: Math.random() * 100,
        },
    }, {
        sequelize,
        modelName: 'Gadget',
        tableName: 'gadgets',
        timestamps: true,
    });
};
exports.initGadgetModel = initGadgetModel;
