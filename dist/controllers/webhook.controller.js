"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookHandler = void 0;
const platformDetection_1 = require("../utils/platformDetection");
const verification_1 = require("../utils/verification");
const pipelineService_1 = require("../services/pipelineService");
const webhookEvent_1 = __importDefault(require("../models/webhookEvent"));
const AllEvents = ["push", "pull_request", "merge_request"];
const webhookHandler = async (req, res) => {
    const platform = (0, platformDetection_1.detectPlatform)(req.headers);
    if (!platform) {
        return res.status(400).json({
            message: "there is no event",
        });
    }
    const eventType = getEventType(platform, req);
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
    const reporitoryName = req.body.repository?.full_name || req.body.project?.name;
    await webhookEvent_1.default.create({
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
    const pipeline = await (0, pipelineService_1.triggerPipeline)({
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
exports.webhookHandler = webhookHandler;
const getEventType = (platform, req) => {
    if (platform == "github")
        return req.headers["x-github-event"];
    else if (platform == "gitlab")
        return req.headers.object_kind;
    else
        return "unknown";
};
const requestVerification = (platform, req) => {
    switch (platform) {
        case "github":
            return (0, verification_1.verifyGithubSign)(req, process.env.GITHUB_SECRET);
        case "gitlab":
            return (0, verification_1.verifyGitLabToken)(req, process.env.GITLAB_SECRET);
        default:
            return false;
    }
};
