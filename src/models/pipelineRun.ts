import { Schema, model, Document } from "mongoose";

export interface IPipelineRun extends Document {
  repository: string;
  eventType: string;
  status: "pending" | "success" | "failed";
  createdAt?: Date;
  completedAt?: Date;
}

const PipelineRunSchema = new Schema<IPipelineRun>({
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

export const PipelineRun = model<IPipelineRun>(
  "PipelineRun",
  PipelineRunSchema
);
