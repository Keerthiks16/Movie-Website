import express from "express";
import {
  deleteItemFromSearchHistory,
  getSearchHistory,
  searchMovie,
  searchPerson,
  searchTv,
} from "../controllers/search.controllers.js";
const router = express.Router();
router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);
router.get("/history", getSearchHistory);
router.get("/history/:id", deleteItemFromSearchHistory);

export default router;
