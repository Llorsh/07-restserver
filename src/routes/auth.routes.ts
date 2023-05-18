import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.controller";
import { validateFields } from "../middlewares/validate.fields.middleware";

const router: Router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login )


export { router as authRoutes };