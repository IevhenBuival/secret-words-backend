import express from 'express';
import * as UserController from '../controlers/users';
import { requiresAuth } from '../middleware/auth';
import { requiresRights } from '../middleware/rights';


const router = express.Router();

router.post("/signup",UserController.signUp);

router.post("/login",UserController.login);

router.get("/",requiresAuth, UserController.getAuthUsers);

router.get("/users",requiresAuth,requiresRights, UserController.getUsers);

router.patch("/users/:userID",requiresAuth,requiresRights,UserController.updateUser);

router.post("/logout",UserController.logout);

export default router;