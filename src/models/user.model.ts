import { Schema, model } from 'mongoose';

interface IUser {
    name: string;
    email: string;
    password: string;
    img: string;
    role: string;
    status: boolean;
    isGoogle: boolean;
}

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    role: {
        type: String,

    },
    status: {
        type: Boolean,
        default: true
    },
    isGoogle: {
        type: Boolean,
        default: false
    }
});

UserSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}


export default model<IUser>('User', UserSchema);