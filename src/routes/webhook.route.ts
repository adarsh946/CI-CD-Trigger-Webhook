import { Router } from "express";
import { webhookHandler } from "../controllers/webhook.controller";

const router = Router();

router.post("/webhook", webhookHandler);

export default router;
