"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const status_code_1 = require("../utils/status_code");
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
//Token
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(status_code_1.statusCode.UNAUTHORIZED).json({ message: 'Access denied, no token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (_b) {
        return res.status(status_code_1.statusCode.FORBIDDEN).json({ message: 'Invalid token' });
    }
};
exports.authenticateToken = authenticateToken;
//Role
const authorizeRole = (requiredRoles) => {
    return (req, res, next) => {
        const { role } = req.user; // Get the role from the decoded token
        if (!requiredRoles.includes(role)) {
            return res.status(status_code_1.statusCode.FORBIDDEN).json({ message: 'Forbidden: Insufficient privileges' });
        }
        next();
    };
};
exports.authorizeRole = authorizeRole;
