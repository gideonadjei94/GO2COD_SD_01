import express from "express";
import {
  addContact,
  deleteContact,
  getContact,
  updatecontact,
} from "../Controllers/contactController.js";
import { protectRoute } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protectRoute, addContact);
router.put("/update", protectRoute, updatecontact);
router.get("/get-contact/:id", protectRoute, getContact);
router.delete("/delete/:id", protectRoute, deleteContact);

export default router;
