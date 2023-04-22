import express from "express";
import {
  contact,
  courseRequest,
  getAdminStats,
} from "../controllers/otherController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.route("/contact").post(isAuthenticated, contact)

router.route("/courserequest").post(isAuthenticated, courseRequest);

// get admin dashboard stats
router.route("/admin/stats").get(isAuthenticated, authorizeAdmin, getAdminStats)

export default router;