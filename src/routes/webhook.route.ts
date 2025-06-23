import { Router } from "express";
import { webhookHandler } from "../controllers/webhook.controller";
import {
  getPipelines,
  getWebhookEvents,
} from "../controllers/statusAndEvent.controller";

const router = Router();

router.post("/webhook", webhookHandler);
router.get("/webhook/pipelines", getPipelines);
router.get("/webhook/events", getWebhookEvents);

export default router;
