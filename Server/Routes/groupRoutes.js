import express from "express";
import {
  addContactToGroup,
  createGroup,
  deleteGroup,
  getGroup,
  getUserGroups,
  removeContactFromGroup,
} from "../Controllers/groupController.js";
import { protectRoute } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create/:userId", protectRoute, createGroup);
router.post(
  "/add/:userId/:phonebookId/:contactId/:groupId",
  protectRoute,
  addContactToGroup
);
router.get("/all/:userId", protectRoute, getUserGroups);
router.get("/group/:userId/:groupId", protectRoute, getGroup);
router.delete(
  "/remove/:userId/:groupId/:contactId",
  protectRoute,
  removeContactFromGroup
);
router.delete("/delete/:userId/:groupId", protectRoute, deleteGroup);

export default router;
