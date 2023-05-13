import roleModel from "../models/role.model";

export const isValidRole = async (role: string = '') => {
    const existRole = await roleModel.findOne({ role });
    
    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }
}