import mongoose from "mongoose";

export async function main() {
  await mongoose
    .connect(process.env.MONGODB_URI!)
    .then(() => console.log("Database is connected successfully"))
    .catch(() => console.log("unable to connect the database"));
}
