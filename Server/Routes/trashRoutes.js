import express from "express";
import {
  addContact,
  getTrash,
  removeContact,
} from "../Controllers/trashController.js";

const router = express.Router();

router.get("/all/:trashId", getTrash);
router.post("/add/:trashId", addContact);
router.delete("/remove/:trashId/:contactId", removeContact);
router.delete("/delete/:phonebookId/:contactid");

export default router;
