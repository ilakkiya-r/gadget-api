import { Request, Response } from 'express';
import {createGadgetServices,getGadgetsServices,getGadgetByIdServices,updateGadgetServices,softDeleteGadgetServices, selfDestructGadgetServices} from '../services/gadgetService';
import { statusCode } from '../utils/status_code';

// Create a new gadget
export const createGadget:any = async (req: Request, res: Response)=> {
  try {
    const newGadget = await createGadgetServices(req.body);
    return res.status(statusCode.OK).json(newGadget);  
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error creating gadget' });
  }
};

// Get all gadgets
export const getGadgets:any = async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string;
    const gadgets = await getGadgetsServices(status);
    return res.status(statusCode.SUCCESS_STATUS).json(gadgets);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error fetching gadgets' });
  }
};

// Get a gadget by ID
export const getGadgetById:any = async (req: Request, res: Response) => {
  try {
    const gadget = await getGadgetByIdServices(req.params.id);
    if (!gadget) {
      return res.status(statusCode.NOT_FOUND_STATUS).json({ message: 'Gadget not found' });
    }
    return res.status(statusCode.SUCCESS_STATUS).json(gadget);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error fetching gadget' });
  }
};

// Update a gadget
export const updateGadget:any = async (req: Request, res: Response) => {
  try {
    const updatedGadget = await updateGadgetServices(req.params.id, req.body);
    if (!updatedGadget) {
      return res.status(statusCode.NOT_FOUND_STATUS).json({ message: 'Gadget not found' });
    }
    return res.status(statusCode.SUCCESS_STATUS).json(updatedGadget);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error updating gadget' });
  }
};

// Soft delete a gadget
export const softDeleteGadget:any = async (req: Request, res: Response) => {
  try {
    const gadget = await softDeleteGadgetServices(req.params.id);
    if (!gadget) {
      return res.status(statusCode.NOT_FOUND_STATUS).json({ message: 'Gadget not found' });
    }
    return res.status(statusCode.SUCCESS_STATUS).json(gadget);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error decommissioning gadget' });
  }
};


// Self-destruct a gadget
export const selfDestructGadget:any = async (req: Request, res: Response) => {
  try {
    const response = await selfDestructGadgetServices(req.params.id);
    if (!response) {
      return res.status(statusCode.NOT_FOUND_STATUS).json({ message: 'Gadget not found' });
    }
    return res.status(statusCode.SUCCESS_STATUS).json(response);
  } catch (error) {
    return res.status(statusCode.INTERNAL_SERVER_STATUS).json({ message: 'Error triggering self-destruct sequence' });
  }
};
