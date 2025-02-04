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
exports.selfDestructGadget = exports.softDeleteGadget = exports.updateGadget = exports.getGadgetById = exports.getGadgets = exports.createGadget = void 0;
const gadgetService_1 = require("../services/gadgetService");
const status_code_1 = require("../utils/status_code");
// Create a new gadget
const createGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGadget = yield (0, gadgetService_1.createGadgetServices)(req.body);
        return res.status(status_code_1.statusCode.OK).json(newGadget);
    }
    catch (error) {
        return res.status(status_code_1.statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error creating gadget' });
    }
});
exports.createGadget = createGadget;
// Get all gadgets
const getGadgets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.query.status;
        const gadgets = yield (0, gadgetService_1.getGadgetsServices)(status);
        return res.status(status_code_1.statusCode.SUCCESS_STATUS).json(gadgets);
    }
    catch (error) {
        return res.status(status_code_1.statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error fetching gadgets' });
    }
});
exports.getGadgets = getGadgets;
// Get a gadget by ID
const getGadgetById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gadget = yield (0, gadgetService_1.getGadgetByIdServices)(req.params.id);
        if (!gadget) {
            return res.status(status_code_1.statusCode.NOT_FOUND_STATUS).json({ message: 'Gadget not found' });
        }
        return res.status(status_code_1.statusCode.SUCCESS_STATUS).json(gadget);
    }
    catch (error) {
        return res.status(status_code_1.statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error fetching gadget' });
    }
});
exports.getGadgetById = getGadgetById;
// Update a gadget
const updateGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedGadget = yield (0, gadgetService_1.updateGadgetServices)(req.params.id, req.body);
        if (!updatedGadget) {
            return res.status(status_code_1.statusCode.NOT_FOUND_STATUS).json({ message: 'Gadget not found' });
        }
        return res.status(status_code_1.statusCode.SUCCESS_STATUS).json(updatedGadget);
    }
    catch (error) {
        return res.status(status_code_1.statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error updating gadget' });
    }
});
exports.updateGadget = updateGadget;
// Soft delete a gadget
const softDeleteGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const gadget = yield (0, gadgetService_1.softDeleteGadgetServices)(req.params.id);
        if (!gadget) {
            return res.status(status_code_1.statusCode.NOT_FOUND_STATUS).json({ message: 'Gadget not found' });
        }
        return res.status(status_code_1.statusCode.SUCCESS_STATUS).json(gadget);
    }
    catch (error) {
        return res.status(status_code_1.statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error decommissioning gadget' });
    }
});
exports.softDeleteGadget = softDeleteGadget;
// Self-destruct a gadget
const selfDestructGadget = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, gadgetService_1.selfDestructGadgetServices)(req.params.id);
        if (!response) {
            return res.status(status_code_1.statusCode.NOT_FOUND_STATUS).json({ message: 'Gadget not found' });
        }
        return res.status(status_code_1.statusCode.SUCCESS_STATUS).json(response);
    }
    catch (error) {
        return res.status(status_code_1.statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error triggering self-destruct sequence' });
    }
});
exports.selfDestructGadget = selfDestructGadget;
