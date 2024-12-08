import express from "express";
import {
  addToFavorite,
  getFavorite,
  removeFromFavorite,
} from "../Controllers/favoriteController.js";
import { protectRoute } from "../Middlewares/authMiddleware.js";

const router = express.Router();

router.get("/all/:favoritesId", protectRoute, getFavorite);
router.post(
  "/add/:favoritesId:contactId/:phonebookId",
  protectRoute,
  addToFavorite
);
router.delete(
  "/remove/:favoriteId/:contactId",
  protectRoute,
  removeFromFavorite
);

export default router;
