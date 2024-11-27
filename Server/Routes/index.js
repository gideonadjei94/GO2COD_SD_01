import express from "express";
import userRoutes from "./userRoutes.js";
import phoneBookRoutes from "./phoneBookRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/contacts", phoneBookRoutes);

export default router;
