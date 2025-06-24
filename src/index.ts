import express from "express";
import dotenv from "dotenv";
import webhookRoute from "./routes/webhook.route";
import { main } from "./config/db";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
import bodyParser from "body-parser";
dotenv.config();
main();

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const swaggerDoc = YAML.load("./swagger.yaml");

app.use("/api/v1", webhookRoute);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(5000, () => {
  console.log("Server is runing on port 5000");
});
