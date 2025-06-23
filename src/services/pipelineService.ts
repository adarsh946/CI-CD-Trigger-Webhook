import { v4 as uuidv4 } from "uuid";

type Pipeline = {
  id: string;
  repository: string;
  eventType: string;
  status: "pending" | "success";
  createdAt: Date;
  completedAt?: Date;
};

// Simulated in-memory storage
const pipelineRuns: Pipeline[] = [];

// Function to trigger a pipeline
export const triggerPipeline = (eventData: {
  repository: string;
  eventType: string;
}) => {
  const id = uuidv4();

  const run: Pipeline = {
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

// Function to get all pipeline runs
export const getPipelines = (): Pipeline[] => pipelineRuns;
