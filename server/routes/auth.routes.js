import express from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import {
  authCheck,
  login,
  logout,
  signout,
  signup,
} from "../controllers/auth.controllers.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/signout", signout);
router.get("/authcheck", protectRoute, authCheck);
export default router;
