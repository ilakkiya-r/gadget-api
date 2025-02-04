"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gadgetRoutes_1 = __importDefault(require("./gadgetRoutes"));
const authRoutes_1 = __importDefault(require("./authRoutes"));
const appRoutes = () => {
    const router = express_1.default.Router();
    router.use('/gadget', gadgetRoutes_1.default);
    router.use('/auth', authRoutes_1.default);
    return router;
};
exports.default = appRoutes;
