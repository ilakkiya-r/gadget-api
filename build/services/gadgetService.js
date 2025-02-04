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
exports.selfDestructGadgetServices = exports.softDeleteGadgetServices = exports.updateGadgetServices = exports.getGadgetByIdServices = exports.getGadgetsServices = exports.createGadgetServices = void 0;
const gadget_1 = require("../models/gadget");
// Create a new gadget
const createGadgetServices = (gadgetData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gadget_1.Gadget.create(Object.assign(Object.assign({}, gadgetData), { mission_success_probability: Math.random() * 100 }));
});
exports.createGadgetServices = createGadgetServices;
// Get all gadgets, optionally filtering by status
const getGadgetsServices = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const where = status ? { status } : {};
    return yield gadget_1.Gadget.findAll({ where });
});
exports.getGadgetsServices = getGadgetsServices;
// Get a gadget by ID
const getGadgetByIdServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gadget_1.Gadget.findByPk(id);
});
exports.getGadgetByIdServices = getGadgetByIdServices;
// Update gadget details
const updateGadgetServices = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const gadget = yield gadget_1.Gadget.findByPk(id);
    if (gadget) {
        return yield gadget.update(updatedData);
    }
    return null;
});
exports.updateGadgetServices = updateGadgetServices;
// Soft delete a gadget
const softDeleteGadgetServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const gadget = yield gadget_1.Gadget.findByPk(id);
    if (gadget) {
        yield gadget.softDelete();
        return gadget;
    }
    return null;
});
exports.softDeleteGadgetServices = softDeleteGadgetServices;
// Self-Destruct a gadget (change status to "Destroyed")
const selfDestructGadgetServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const gadget = yield gadget_1.Gadget.findByPk(id);
    if (gadget) {
        const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
        yield gadget.update({ status: "Destroyed" });
        return { message: `Gadget self-destruct initiated. Confirmation Code: ${confirmationCode}` };
    }
    return null;
});
exports.selfDestructGadgetServices = selfDestructGadgetServices;
