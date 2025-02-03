import express from 'express';
import gadgetRoutes from './gadgetRoutes';
import authRoutes from './authRoutes';

const appRoutes = () => {
  const router = express.Router();
  router.use('/gadget', gadgetRoutes);
  router.use('/auth', authRoutes);
 
  
  return router;
};

export default appRoutes;
