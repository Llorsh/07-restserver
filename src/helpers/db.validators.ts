import roleModel from "../models/role.model";
import userModel from "../models/user.model";

export const isValidRole = async (role: string = '') => {
    const existRole = await roleModel.findOne({ role });

    if (!existRole) {
        throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }
}

export const emailExist = async (email: string = '') => {
    const emailExist = await userModel.findOne({ email });

    if (emailExist) {
        throw new Error(`El correo ${email} ya esta registrado`);
    }
}


export const userExistById = async (id: string = '') => {
    const idExist = await userModel.findById(id);

    if (!idExist) {
        throw new Error(`El id ${id} no existe`);
    }
}