export const detectPlatform = (headers: any) => {
  if (headers["x-github-event"]) return "github";
  if (headers["x-gitlab-event"]) return "gitlab";
};
