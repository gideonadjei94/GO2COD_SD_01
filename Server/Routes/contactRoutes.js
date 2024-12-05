import express from "express";
import {
  addContact,
  deleteContact,
  getAllContacts,
  getContact,
  updateContact,
} from "../Controllers/contactController.js";
import { protectRoute } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all/:phonebookId", protectRoute, getAllContacts);
router.post("/add/:phonebookId", protectRoute, addContact);
router.put("/update/:phonebookId/:contactId", protectRoute, updateContact);
router.get("/get-contact/:phonebookId/:contactId", protectRoute, getContact);
router.delete("/delete/:phonebookId/:contactId", protectRoute, deleteContact);

export default router;
