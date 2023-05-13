import { Router } from "express";
import { usersDelete, usersGet, usersPost, usersPut } from "../controllers/users.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate.fields.middleware";
import { emailExist, isValidRole, userExistById } from "../helpers/db.validators";

const router: Router = Router();

router.get('/', usersGet);

router.post('/', [
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom(emailExist),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validateFields,
], usersPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistById),
    check('role').custom(isValidRole),
    validateFields
], usersPut);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(userExistById),
    validateFields
], usersDelete);


export { router as userRoutes };