"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineRun = void 0;
const mongoose_1 = require("mongoose");
const PipelineRunSchema = new mongoose_1.Schema({
    repository: { type: String, required: true },
    eventType: { type: String, required: true },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
    completedAt: Date,
});
exports.PipelineRun = (0, mongoose_1.model)("PipelineRun", PipelineRunSchema);
