import { body, param } from 'express-validator';

export const createGadgetValidation = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ max: 100 })
    .withMessage('Name must not exceed 100 characters'),

  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['Available', 'Deployed', 'Destroyed', 'Decommissioned'])
    .withMessage('Invalid status value'),
];


export const updateGadgetValidation = [
    param('id')
      .isUUID()
      .withMessage('Invalid gadget ID format'),
  
    body('name')
      .optional()
      .isString()
      .withMessage('Name must be a string')
      .isLength({ max: 100 })
      .withMessage('Name must not exceed 100 characters'),
  
    body('status')
      .optional()
      .isIn(['Available', 'Deployed', 'Destroyed', 'Decommissioned'])
      .withMessage('Invalid status value'),
]