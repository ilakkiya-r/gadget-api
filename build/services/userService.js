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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerService = void 0;
const user_1 = require("../models/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
const registerService = (email, password, role) => __awaiter(void 0, void 0, void 0, function* () {
    // Hash password before saving
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Check if the user already exists
    const existingUser = yield user_1.User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }
    // Create user
    const user = yield user_1.User.create({ email, password: hashedPassword, role });
    return {
        id: user.id,
        email: user.email,
        role: user.role, // Return the role as well
    };
});
exports.registerService = registerService;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid email or password');
    }
    // Compare password with hashed password
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    // Generate JWT token with user role
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
});
exports.loginUser = loginUser;
