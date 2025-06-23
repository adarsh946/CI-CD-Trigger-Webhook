import { PipelineRun } from "../models/pipelineRun";
import webhookEvent from "../models/webhookEvent";

export const getPipelines = async (req: any, res: any) => {
  try {
    const pipelines = await PipelineRun.find()
      .sort({ createdAt: -1 })
      .limit(20); // fetch recent 20 runs

    res.status(200).json({
      count: pipelines.length,
      pipelines,
    });
  } catch (err) {
    console.error("Error fetching pipeline history:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getWebhookEvents = async (req: any, res: any) => {
  try {
    const events = await webhookEvent.find().sort({ receivedAt: -1 }).limit(20);

    if (!events) {
      return res.status(404).json({
        message: "unable to fetch events",
      });
    }

    res.status(200).json({
      count: events.length,
      events,
    });
  } catch (err) {
    console.error("Error fetching webhook events:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
