"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const gadgetController_1 = require("../controllers/gadgetController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const gadgetValidation_1 = require("../validations/gadgetValidation");
const errorValidation_1 = require("../validations/errorValidation");
const router = express_1.default.Router();
//Gadget
router.post('/create', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)("admin"), gadgetValidation_1.createGadgetValidation, errorValidation_1.errorValidation, gadgetController_1.createGadget);
router.get('/list', gadgetController_1.getGadgets);
router.get('/list/:id', gadgetController_1.getGadgetById);
router.patch('/update/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(["admin", "technician"]), gadgetValidation_1.updateGadgetValidation, errorValidation_1.errorValidation, gadgetController_1.updateGadget);
router.delete('/delete/:id', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)("admin"), gadgetController_1.softDeleteGadget);
router.post('/:id/self-destruct', authMiddleware_1.authenticateToken, (0, authMiddleware_1.authorizeRole)(["admin", "technician"]), gadgetController_1.selfDestructGadget);
exports.default = router;
