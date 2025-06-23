import { PipelineRun, IPipelineRun } from "../models/pipelineRun"; // Assuming you have exported types
import { Document } from "mongoose";

interface TriggerPipelineInput {
  repository: string;
  eventType: string;
}

export const triggerPipeline = async ({
  repository,
  eventType,
}: TriggerPipelineInput): Promise<IPipelineRun & Document> => {
  const run = new PipelineRun({
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
