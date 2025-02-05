import { Gadget } from '../models/gadget';


// Create a new gadget
export const createGadgetServices = async (gadgetData: any) => {

  const existingGadget = await Gadget.findOne({ where: { name: gadgetData.name } });
  if (existingGadget) {
    return null;
  }
  return await Gadget.create({
    ...gadgetData,
    mission_success_probability: Math.random() * 100,
  });
};

// Get all gadgets, optionally filtering by status

export const getGadgetsServices = async (status?: string) => {
  const where = status ? { status } : {};
  return await Gadget.findAll({ where });
};


// Get a gadget by ID
export const getGadgetByIdServices = async (id: string) => {
  return await Gadget.findByPk(id);
};

// Update gadget details
export const updateGadgetServices = async (id: string, updatedData: any) => {
  const gadget = await Gadget.findByPk(id);
  if (gadget) {
    return await gadget.update(updatedData);
  }
  return null;
};

// Soft delete a gadget
export const softDeleteGadgetServices = async (id: string) => {
  const gadget = await Gadget.findByPk(id);
  if (gadget) {
    await gadget.softDelete();
    return gadget;
  }
  return null;
};

// Self-Destruct a gadget (change status to "Destroyed")
export const selfDestructGadgetServices = async (id: string) => {
  const gadget = await Gadget.findByPk(id);
  if (gadget) {
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    await gadget.update({ status: "Destroyed" });
    return { message: `Gadget self-destruct initiated. Confirmation Code: ${confirmationCode}` };
  }
  return null;
};
