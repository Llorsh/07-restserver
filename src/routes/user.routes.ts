import { Router } from "express";
import { usersDelete, usersGet, usersPost, usersPut } from "../controllers/users.controller";

const router: Router = Router();

router.get('/', usersGet);

router.post('/', usersPost);

router.put('/:id', usersPut);

router.delete('/:id', usersDelete);


export { router as userRoutes };