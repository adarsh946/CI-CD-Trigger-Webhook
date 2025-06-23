"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.triggerPipeline = void 0;
const pipelineRun_1 = require("../models/pipelineRun"); // Assuming you have exported types
const triggerPipeline = async ({ repository, eventType, }) => {
    const run = new pipelineRun_1.PipelineRun({
        repository,
        eventType,
        status: "pending",
    });
    await run.save();
    console.log(`🚀 Pipeline triggered: ${run._id} for ${repository}`);
    // Simulate build
    setTimeout(async () => {
        run.status = "success";
        run.completedAt = new Date();
        await run.save();
        console.log(`✅ Pipeline completed: ${run._id}`);
    }, 5000);
    return run;
};
exports.triggerPipeline = triggerPipeline;
