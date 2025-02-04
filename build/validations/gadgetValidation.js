"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGadgetValidation = exports.createGadgetValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createGadgetValidation = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters'),
    (0, express_validator_1.body)('status')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['Available', 'Deployed', 'Destroyed', 'Decommissioned'])
        .withMessage('Invalid status value'),
];
exports.updateGadgetValidation = [
    (0, express_validator_1.param)('id')
        .isUUID()
        .withMessage('Invalid gadget ID format'),
    (0, express_validator_1.body)('name')
        .optional()
        .isString()
        .withMessage('Name must be a string')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['Available', 'Deployed', 'Destroyed', 'Decommissioned'])
        .withMessage('Invalid status value'),
];
