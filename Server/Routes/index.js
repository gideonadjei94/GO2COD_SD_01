import express from "express";
import userRoutes from "./userRoutes.js";
import contactRoutes from "./contactRoutes.js";
import oauthRoutes from "./oauthRoutes.js";
import favoriteRoutes from "./favoriteRoutes.js";
import trashRoutes from "./trashRoutes.js";

const router = express.Router();

router.use("/user/auth", userRoutes);
router.use("/user/oauth", oauthRoutes);
router.use("/phonebook", contactRoutes);
router.use("/user/favorites", favoriteRoutes);
router.use("/user/trash", trashRoutes);
export default router;
