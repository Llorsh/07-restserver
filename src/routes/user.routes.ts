import { Router } from "express";
import { usersDelete, usersGet, usersPost, usersPut } from "../controllers/users.controller";
import { check } from "express-validator";

const router: Router = Router();

router.get('/', usersGet);

router.post('/', [

    check('email', 'El correo no es valido').isEmail(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
], usersPost);

router.put('/:id', usersPut);

router.delete('/:id', usersDelete);


export { router as userRoutes };