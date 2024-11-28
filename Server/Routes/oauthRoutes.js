import express from "express";
import { OAuthLogin, OAuthSignUp } from "../Controllers/userController.js";

const router = express.Router();

router.post("/signup", OAuthSignUp);
router.post("/login", OAuthLogin);

export default router;
