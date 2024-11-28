import express from "express";
import userRoutes from "./userRoutes.js";
// import phoneBookRoutes from "./phoneBookRoutes.js";
import contactRoutes from "./contactRoutes.js";
import oauthRoutes from "./oauthRoutes.js";

const router = express.Router();

router.use("/user/auth", userRoutes);
router.use("/user/oauth", oauthRoutes);
// router.use("/contacts", phoneBookRoutes);
router.use("/phonebook", contactRoutes);
export default router;
