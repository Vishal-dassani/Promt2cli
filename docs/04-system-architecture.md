# Prompt2CLI — System Architecture

**Document Version:** 1.1
**Project:** Prompt2CLI
**Status:** Current implementation, with planned features identified
**Frontend:** React + Vite
**Backend:** Node.js + Express
**AI Provider:** Google Gemini

---

## 1. Overview

Prompt2CLI accepts a natural-language request and a selected shell, asks Gemini
to generate a command specifically for that shell, and returns the command and
its risk assessment to the frontend. The application does not execute generated
commands.

The browser communicates with the Express API. During local development, the
Vite development server proxies `/api` requests to the backend. The backend
keeps the Gemini API key and performs AI requests.

Authentication, persistent user accounts, and generation limits are not part
of the current implementation.

## 2. High-Level Architecture

```text
+-------------------+
| React Frontend    |
| Prompt + shell UI |
+---------+---------+
          |
          | POST /api/commands/generate
          | { prompt, shell }
          v
+-------------------+        Local development
| Vite dev server   |-------> http://localhost:5000
| /api proxy        |         Express API
+-------------------+             |
                                   v
                         +-------------------+
                         | Express API       |
                         | CORS + JSON       |
                         | /api/commands     |
                         +---------+---------+
                                   |
                                   | generateCommand(prompt, shell)
                                   v
                         +-------------------+
                         | Gemini AI service |
                         | One shell-specific|
                         | command + risk    |
                         +---------+---------+
                                   |
                                   v
                         +-------------------+
                         | Google Gemini API |
                         +-------------------+

                         API response
          React <------- { success, prompt, platform, command,
                            riskAssessment }
```

In production, configure `VITE_API_BASE_URL` to the API origin. The backend
allows browser origins configured by `CLIENT_URL`.

## 3. Application Entry Points and Configuration

### Backend

`server/index.js` is the Express entry point. It loads environment variables,
configures CORS and JSON request parsing, mounts command routes, provides a
health endpoint, and starts the server on `PORT` (default `5000`).

Relevant environment variables:

| Variable | Purpose |
|---|---|
| `PORT` | Express listening port; defaults to `5000` |
| `CLIENT_URL` | Comma-separated browser origins allowed by CORS |
| `GEMINI_API_KEY` | Server-side Gemini credential |

### Frontend

The React application calls the API through
`client/src/api/axiosInstance.js`. Requests have a 60-second timeout to allow
for AI response latency. In Vite development mode, the API base URL is relative
so `/api` requests use the development server's proxy to `http://localhost:5000`.
Outside development, `VITE_API_BASE_URL` supplies the API base URL.

## 4. Command Generation Request Flow

The frontend offers these shell values:

| Request `shell` | Shell sent to Gemini |
|---|---|
| `powershell` | Windows PowerShell |
| `bash` | Linux Bash |
| `zsh` | macOS Zsh |

### Endpoint

`POST /api/commands/generate`

Example request:

```json
{
  "prompt": "List all files, including hidden files, in the current directory.",
  "shell": "bash"
}
```

The `shell` field is optional for API clients; when omitted, it defaults to
`powershell`. Unsupported shell values and empty or non-string prompts are
rejected with HTTP 400.

### Processing

1. The command route validates the prompt and shell.
2. The route calls `generateCommand(prompt, shell)` in the AI service.
3. The service maps the shell value to a human-readable shell name, includes
   the selected shell in the Gemini prompt, and asks for a command for that
   shell only.
4. Gemini is asked to return structured JSON containing one `command` and its
   `riskAssessment` (`score`, `level`, `potentialDamage`, `reason`, and
   `recommendation`).
5. The route returns the generated command and assessment to the frontend.
   If the command is missing, it returns HTTP 502.
6. The frontend displays the command. It does not execute it.

Example success response:

```json
{
  "success": true,
  "prompt": "List all files, including hidden files, in the current directory.",
  "platform": "bash",
  "command": "ls -la",
  "riskAssessment": {
    "score": 1,
    "level": "Low",
    "potentialDamage": [],
    "reason": "Lists directory contents without modifying files.",
    "recommendation": "Review the output for sensitive filenames."
  }
}
```

AI provider failures are logged on the server and returned as an error
response. The Gemini credential is never sent to the frontend.

## 5. Current Backend Structure

```text
server/
|-- index.js
|-- routes/
|   |-- commandRoutes.js
|-- services/
|   |-- aiService.js
|-- .env
|-- package.json
```

| File | Responsibility |
|---|---|
| `server/index.js` | Configure and start Express; mount routes and middleware |
| `server/routes/commandRoutes.js` | Validate generation requests and shape API responses |
| `server/services/aiService.js` | Map shell values, call Gemini, and parse structured output |
| `server/.env` | Hold local server configuration and secrets; do not commit |

The React app and its API client are under `client/`. Authentication, database,
controller, and middleware modules shown in earlier proposals have not yet been
implemented.

## 6. Error Handling and Security

- Keep `GEMINI_API_KEY` on the server; do not expose it in Vite environment
  variables or frontend bundles.
- Validate the prompt and allow only the supported shell values at the API
  boundary.
- Use `CLIENT_URL` to configure allowed browser origins when the frontend calls
  the API directly. In local development, the Vite proxy provides a same-origin
  browser request.
- Treat prompts as user input and keep them separate from system-level model
  instructions.
- Display commands for review; never execute them automatically.
- Add request-size limits, rate limiting, and broader input constraints as the
  service is prepared for production.

## 7. Planned Features

The following items describe possible future work and are not implemented in
the current API:

- User signup, login, and session management.
- Anonymous generation limits and persistent usage tracking.
- A database for accounts or usage records.
- Dedicated usage and authentication endpoints.

These features should be designed and documented when they are added rather
than treated as existing behavior.

## 8. Architecture Decisions

| Decision ID | Decision | Reason |
|---|---|---|
| ADR-01 | Use React and Vite for the frontend | Supports the current interactive client and local development workflow |
| ADR-02 | Use Express for the backend API | Provides a lightweight HTTP boundary for frontend requests |
| ADR-03 | Call Gemini from a backend service | Keeps the provider credential off the client and isolates AI integration |
| ADR-04 | Pass the selected shell through the API to Gemini | Generates only the syntax the user requested |
| ADR-05 | Require structured output for the command and risk assessment | Gives the frontend a predictable response shape |
| ADR-06 | Never execute generated commands automatically | Keeps execution under the user's control |
| ADR-07 | Proxy `/api` through Vite in development | Avoids browser cross-origin requests during local development |
