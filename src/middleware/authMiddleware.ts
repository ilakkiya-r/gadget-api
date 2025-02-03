import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { statusCode } from '../utils/status_code';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

//Token
export const authenticateToken:any = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(statusCode.UNAUTHORIZED).json({ message: 'Access denied, no token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string }; 
    (req as any).user = decoded;  
    next();
  } catch {
    return res.status(statusCode.FORBIDDEN).json({ message: 'Invalid token' });
  }
};

//Role
export const authorizeRole:any = (requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = (req as any).user;  // Get the role from the decoded token
    if (!requiredRoles.includes(role)) {
      return res.status(statusCode.FORBIDDEN).json({ message: 'Forbidden: Insufficient privileges' });
    }
    
    next();
  };
};



