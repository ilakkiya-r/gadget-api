import express from 'express';
import { createGadget, getGadgetById, getGadgets, selfDestructGadget, softDeleteGadget, updateGadget } from '../controllers/gadgetController';
import {authenticateToken, authorizeRole} from '../middleware/authMiddleware';
import {createGadgetValidation , updateGadgetValidation } from '../validations/gadgetValidation'
import { errorValidation } from '../validations/errorValidation';


const router = express.Router();

//Gadget
router.post('/create',authenticateToken,authorizeRole("admin"), createGadgetValidation, errorValidation, createGadget);
router.get('/list', getGadgets );
router.get('/list/:id', getGadgetById);
router.patch('/update/:id',authenticateToken,authorizeRole(["admin", "technician"]), updateGadgetValidation,errorValidation, updateGadget);
router.delete('/delete/:id',authenticateToken,authorizeRole("admin"), softDeleteGadget);
router.post('/:id/self-destruct',authenticateToken,authorizeRole(["admin","technician"]), selfDestructGadget);

export default router;
