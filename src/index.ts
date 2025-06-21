import express from "express";
import dotenv from "dotenv";
import webhookRoute from "./routes/webhook.route";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1", webhookRoute);

app.listen(5000, () => {
  console.log("Server is runing on port 5000!");
});
