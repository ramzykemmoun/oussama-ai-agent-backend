import express from "express";
import { UserController } from "../controllers/user.controller";
const router = express.Router();


router.post('/register', UserController.register)

export default router
