# 🚀 CI/CD Trigger Webhook – Node.js

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-Backend-lightgrey?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?logo=mongodb)](https://www.mongodb.com)
[![GitHub](https://img.shields.io/badge/GitHub-Webhooks-blue?logo=github)](https://github.com)

A backend-only Node.js service that listens for webhook events from GitHub and GitLab, authenticates them securely, and triggers a simulated CI/CD pipeline. Includes persistent logging and API endpoints for status tracking.

---

## 📦 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- dotenv
- crypto (HMAC verification)
- Postman / Swagger (API testing/docs)

---

## 🔧 Installation

```bash
git clone https://github.com/your-username/ci-cd-webhook
cd ci-cd-webhook
npm install
```

---

## ⚙️ Setup `.env`

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ci-cd-webhook
GITHUB_SECRET=yourgithubsecret
GITLAB_SECRET=yourgitlabsecret
```

---

## ▶️ Run the Server

```bash
npm run dev
```

---

## 📮 Webhook Testing via Postman

### 🔹 GitHub Webhook

**Method:** `POST`  
**URL:** `http://localhost:5000/api/v1webhook`  
**Headers:**

- `Content-Type: application/json`
- `X-GitHub-Event: push`
- `X-Hub-Signature-256: sha256=<generated-hmac>`

**Body:**

```json
{
  "repository": {
    "full_name": "adarsh/webhook-test"
  },
  "ref": "refs/heads/main",
  "head_commit": {
    "id": "abc123",
    "message": "Initial commit"
  }
}
```

> 🔐 Generate HMAC using your `GITHUB_SECRET`.

---

### 🔹 GitLab Webhook

**Method:** `POST`  
**URL:** `http://localhost:3000/api/vi/webhook`  
**Headers:**

- `Content-Type: application/json`
- `X-Gitlab-Token: yourgitlabsecret`
- `X-Gitlab-Event: Push Hook`

**Body:**

```json
{
  "object_kind": "push",
  "ref": "refs/heads/main",
  "project": {
    "name": "webhook-test"
  },
  "commits": [
    {
      "id": "abc123",
      "message": "Initial commit"
    }
  ]
}
```

---

## 📘 API Endpoints

| Method | Endpoint             | Description                           |
| ------ | -------------------- | ------------------------------------- |
| POST   | `/webhook`           | Accepts webhook and triggers pipeline |
| GET    | `/webhook/pipelines` | Returns recent pipeline status        |
| GET    | `/webhook/events`    | Returns raw webhook logs              |
| GET    | `/api-docs`          | Swagger UI documentation              |

---

## ✅ Features

- Event filtering: push, pull/merge requests
- HMAC + token authentication
- MongoDB logging of pipelines/events
- Retry mechanism (configurable)

---

## 📄 Submission

- ✅ Source Code
- ✅ `.env.example`
- ✅ README.md
- ✅ Swagger Docs (`/api-docs`)
- ✅ Postman tested
