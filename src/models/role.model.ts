import { Schema, model } from "mongoose";

interface IRole {
    role: string;
}

const RoleSchema = new Schema<IRole>({
    role: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});

export default model<IRole>('Role', RoleSchema);