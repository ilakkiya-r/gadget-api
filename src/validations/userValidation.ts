import { body, param } from 'express-validator';

export const registerUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['admin', 'agent', 'technician'])
    .withMessage('Role must be one of admin, agent, or technician')
];

export const loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required'),
  

  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];