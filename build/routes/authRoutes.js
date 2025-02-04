"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userValidation_1 = require("../validations/userValidation");
const errorValidation_1 = require("../validations/errorValidation");
const router = (0, express_1.Router)();
router.post('/register', userValidation_1.registerUserValidation, errorValidation_1.errorValidation, userController_1.register);
router.post('/login', userValidation_1.loginUserValidation, errorValidation_1.errorValidation, userController_1.login);
exports.default = router;
