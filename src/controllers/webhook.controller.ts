import { Request } from "express";
import { detectPlatform } from "../utils/platformDetection";

const AllEvents = ["push", "pull_request", "merge_request"];

export const webhookHandler = (req: any, res: any) => {
  const platform = detectPlatform(req.headers);

  if (!platform) {
    return res.status(400).json({
      message: "there is no event",
    });
  }

  const eventType = getEventType(platform, req) as string;
  console.log(`webhook recived from ${platform} - Event: {eventType}`);

  if (!AllEvents.includes(eventType)) {
    return res.status(404).json({
      message: `Event ${eventType} is ignored`,
    });
  }

  // Loging payload
  console.log("✅ Valid event payload:", {
    repository: req.body.repository?.full_name || req.body.project?.name,
    eventType,
    platform,
  });

  // later trigger pipeline here
  res.status(200).json({ message: "Webhook event accepted" });
};

const getEventType = (platform: any, req: Request) => {
  if (platform == "github") return req.headers["x-github-event"];
  else if (platform == "gitlab") return req.headers.object_kind;
  else return "unknown";
};
