import crypto from "crypto";

const secret = process.env.GITHUB_SECRET!;

export const verifyGithubSign = (req: any, secret: string) => {
  const signature = req.headers["x-hub-signature-256"];
  if (!signature) return false;

  const hmac = crypto.createHmac("sha256", secret);
  console.log(hmac);
  const digest =
    "sha256=" + hmac.update(JSON.stringify(req.body)).digest("hex");
  console.log(digest);

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(digest);

  // Check lengths BEFORE using timingSafeEqual
  if (sigBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
};

export const verifyGitLabToken = (req: any, secret: string) => {
  const token = req.headers["x-gitlab-token"];
  if (!token) return false;
  if (token === secret) return true;
};
