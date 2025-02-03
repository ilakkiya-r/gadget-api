import { Router } from 'express';
import { register, login } from '../controllers/userController';
import { loginUserValidation, registerUserValidation } from '../validations/userValidation';
import { errorValidation } from '../validations/errorValidation';

const router = Router();

router.post('/register', registerUserValidation,errorValidation, register);
router.post('/login', loginUserValidation,errorValidation, login);

export default router;
