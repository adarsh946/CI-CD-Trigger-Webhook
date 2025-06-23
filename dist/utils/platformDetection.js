"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPlatform = void 0;
const detectPlatform = (headers) => {
    if (headers["x-github-event"])
        return "github";
    if (headers["x-gitlab-event"])
        return "gitlab";
};
exports.detectPlatform = detectPlatform;
