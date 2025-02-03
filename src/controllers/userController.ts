import { Request, Response } from 'express';
import { loginUser, registerService } from '../services/userService';
import { statusCode } from '../utils/status_code';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = await registerService(email, password, role);

    res.status(statusCode.OK).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,  
      },
    });
  } catch (error: any) {
    res.status(statusCode.INTERNAL_SERVER_STATUS).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);
    res.status(statusCode.SUCCESS_STATUS).json({
      message: 'Login successful',
      token: token,
    });
  } catch (error: any) {
    res.status(statusCode.UNAUTHORIZED).json({ message: error.message });
  }
};
