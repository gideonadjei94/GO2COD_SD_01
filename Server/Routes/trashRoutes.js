import express from "express";
import {
  addContact,
  deleteContact,
  getTrash,
  restoreContact,
} from "../Controllers/trashController.js";
import { protectRoute } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all/:trashId", protectRoute, getTrash);
router.post("/add/:trashId/:phonebookId", protectRoute, addContact);
router.delete("/remove/:trashId/:phonebookId", protectRoute, restoreContact);
router.delete("/delete/:trashId/:contactId", protectRoute, deleteContact);

export default router;
