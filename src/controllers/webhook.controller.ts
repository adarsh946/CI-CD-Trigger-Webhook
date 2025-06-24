import { Request } from "express";
import { detectPlatform } from "../utils/platformDetection";
import { verifyGithubSign, verifyGitLabToken } from "../utils/verification";
import { triggerPipeline } from "../services/pipelineService";
import WebhookEvent from "../models/webhookEvent";

const AllEvents = ["push", "pull_request", "merge_request"];

export const webhookHandler = async (req: any, res: any) => {
  const platform = detectPlatform(req.headers);

  if (!platform) {
    return res.status(400).json({
      message: "there is no event",
    });
  }

  const eventType = getEventType(platform, req) as string;
  console.log(`webhook recived from ${platform} - Event: ${eventType}`);

  if (!AllEvents.includes(eventType)) {
    return res.status(404).json({
      message: `Event ${eventType} is ignored`,
    });
  }

  const isAuthenticated = requestVerification(platform, req);
  if (!isAuthenticated) {
    return res.status(401).send("❌ Unauthorized webhook");
  }

  const reporitoryName =
    req.body.repository?.full_name || req.body.project?.name;

  await WebhookEvent.create({
    platform,
    eventType,
    payload: req.body,
  });
  // Loging payload
  console.log("✅ Valid event payload:", {
    reporitoryName,
    eventType,
    platform,
  });
  const pipeline = await triggerPipeline({
    repository: reporitoryName,
    eventType,
  });

  // later trigger pipeline here
  res.status(200).json({
    message: "Webhook event accepted",
    pipelineId: pipeline.id,
    pipelineStatus: pipeline.status,
  });
};

const getEventType = (platform: any, req: Request) => {
  if (platform == "github") return req.headers["x-github-event"];
  else if (platform == "gitlab") return req.body.object_kind;
  else return "unknown";
};

const requestVerification = (platform: any, req: Request) => {
  switch (platform) {
    case "github":
      return verifyGithubSign(req, process.env.GITHUB_SECRET!);
    case "gitlab":
      return verifyGitLabToken(req, process.env.GITLAB_SECRET!);
    default:
      return false;
  }
};
