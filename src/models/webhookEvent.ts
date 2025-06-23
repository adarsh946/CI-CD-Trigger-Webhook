import mongoose from "mongoose";

const webhookEventSchema = new mongoose.Schema({
  platform: String,
  eventType: String,
  payload: Object,
  receivedAt: { type: Date, default: Date.now },
});

export default mongoose.model("WebhookEvent", webhookEventSchema);
