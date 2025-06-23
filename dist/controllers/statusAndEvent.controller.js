"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebhookEvents = exports.getPipelines = void 0;
const pipelineRun_1 = require("../models/pipelineRun");
const webhookEvent_1 = __importDefault(require("../models/webhookEvent"));
const getPipelines = async (req, res) => {
    try {
        const pipelines = await pipelineRun_1.PipelineRun.find()
            .sort({ createdAt: -1 })
            .limit(20); // fetch recent 20 runs
        res.status(200).json({
            count: pipelines.length,
            pipelines,
        });
    }
    catch (err) {
        console.error("Error fetching pipeline history:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getPipelines = getPipelines;
const getWebhookEvents = async (req, res) => {
    try {
        const events = await webhookEvent_1.default.find().sort({ receivedAt: -1 }).limit(20);
        if (!events) {
            return res.status(404).json({
                message: "unable to fetch events",
            });
        }
        res.status(200).json({
            count: events.length,
            events,
        });
    }
    catch (err) {
        console.error("Error fetching webhook events:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getWebhookEvents = getWebhookEvents;
