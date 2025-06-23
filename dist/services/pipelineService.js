"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPipelines = exports.triggerPipeline = void 0;
const uuid_1 = require("uuid");
// Simulated in-memory storage
const pipelineRuns = [];
// Function to trigger a pipeline
const triggerPipeline = (eventData) => {
    const id = (0, uuid_1.v4)();
    const run = {
        id,
        repository: eventData.repository,
        eventType: eventData.eventType,
        status: "pending",
        createdAt: new Date(),
    };
    pipelineRuns.push(run);
    console.log(`🚀 Pipeline triggered: ${id} for ${run.repository}`);
    // Simulate async pipeline completion
    setTimeout(() => {
        run.status = "success";
        run.completedAt = new Date();
        console.log(`✅ Pipeline completed: ${id}`);
    }, 5000);
    return run;
};
exports.triggerPipeline = triggerPipeline;
// Function to get all pipeline runs
const getPipelines = () => pipelineRuns;
exports.getPipelines = getPipelines;
