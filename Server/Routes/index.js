import express from "express";
import userRoutes from "./userRoutes.js";
import phoneBookRoutes from "./phoneBookRoutes.js";
import contactRoutes from "./contactRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
// router.use("/contacts", phoneBookRoutes);
router.use("/phonebook", contactRoutes);
export default router;
