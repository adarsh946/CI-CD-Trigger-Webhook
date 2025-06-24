"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const webhook_route_1 = __importDefault(require("./routes/webhook.route"));
const db_1 = require("./config/db");
const yamljs_1 = __importDefault(require("yamljs"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
(0, db_1.main)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
const swaggerDoc = yamljs_1.default.load("./swagger.yaml");
app.use("/api/v1", webhook_route_1.default);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
app.listen(5000, () => {
    console.log("Server is runing on port 5000");
});
