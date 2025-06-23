"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const mongoose_1 = __importDefault(require("mongoose"));
async function main() {
    await mongoose_1.default
        .connect(process.env.MONGODB_URI)
        .then(() => console.log("Database is connected successfully"))
        .catch(() => console.log("unable to connect the database"));
}
