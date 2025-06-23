"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGitLabToken = exports.verifyGithubSign = void 0;
const crypto_1 = __importDefault(require("crypto"));
const secret = process.env.GITHUB_SECRET;
const verifyGithubSign = (req, secret) => {
    const signature = req.headers["x-hub-signature-256"];
    if (!signature)
        return false;
    const hmac = crypto_1.default.createHmac("sha256", secret);
    console.log(hmac);
    const digest = "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");
    console.log(digest);
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(digest);
    // Check lengths BEFORE using timingSafeEqual
    if (sigBuffer.length !== expectedBuffer.length) {
        return false;
    }
    return crypto_1.default.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
};
exports.verifyGithubSign = verifyGithubSign;
const verifyGitLabToken = (req, secret) => {
    const token = req.headers["x-gitlab-token"];
    if (!token)
        return false;
    if (token === secret)
        return true;
};
exports.verifyGitLabToken = verifyGitLabToken;
