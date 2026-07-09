import { Router } from "express";
import {
  aiStatus,
  generateEmailDraft,
  leadSummary,
  salesInsights,
} from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();
router.use(protect);

router.get("/status", aiStatus);
router.post("/lead-summary", leadSummary);
router.post("/generate-email", generateEmailDraft);
router.post("/sales-insight", salesInsights);

export default router