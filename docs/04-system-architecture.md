# Prompt2CLI — System Architecture

**Document Version:** 1.0  
**Project:** Prompt2CLI  
**Status:** Proposed  
**Frontend:** React + Vite  
**Backend:** Node.js + Express  
**AI Provider:** OpenAI API (planned)

---

## 1. Overview

Prompt2CLI is an AI-powered web application that converts natural-language instructions into terminal commands.

A user enters a prompt in plain English, such as:

> Create a new folder named projects.

The application sends the prompt to the backend, which forwards it to the AI provider. The generated terminal command is returned to the frontend and automatically copied to the user's clipboard.

Unauthenticated users can generate two commands for free. From the third request onward, users must authenticate before generating additional commands.

The system follows a client-server architecture, separating the frontend, backend business logic, authentication, and AI integration.

## 2. High-Level Architecture

```text
                    USER
                      |
                      v
             +------------------+
             |   React Frontend |
             |                  |
             | Home             |
             | About            |
             | Contact          |
             | Login / Signup   |
             +------------------+
                      |
                      | HTTP Requests
                      v
             +------------------+
             |  Express Server  |
             |                  |
             |    server.js     |
             |  Entry Point     |
             +------------------+
                      |
             +--------+---------+
             |                  |
             v                  v
    +----------------+  +----------------+
    | Command Routes |  |  Auth Routes   |
    |                |  |                |
    | Generate       |  | Login          |
    | Usage Limit    |  | Signup         |
    +----------------+  +----------------+
             |                  |
             v                  v
    +----------------+  +----------------+
    | OpenAI API     |  | User Database  |
    |                |  |                |
    | Generates      |  | User Accounts  |
    | Commands       |  | Auth Data      |
    +----------------+  +----------------+
             |
             v
    +----------------+
    | React Frontend |
    |                |
    | Display Result |
    | Copy Command   |
    +----------------+
```

*Note: This is the proposed architecture. The backend, authentication system, database, and AI integration have not yet been implemented.*

---

## 3. Express Entry Point

### Decision: `server.js`

The Express entry point will be:

`server/server.js`

This file will initialize the Express application, configure middleware, register API routes, and start the HTTP server.

### Why is `server.js` the entry point?

Every backend application needs an entry point: the file from which execution begins.

When Node.js starts the application, it executes `server.js`. This file creates the Express application and connects the different parts of the backend.

For example, it will:

1. Initialize Express.
2. Configure JSON request parsing.
3. Configure CORS for the React frontend.
4. Load environment variables.
5. Register command-generation routes.
6. Register authentication routes.
7. Register error-handling middleware.
8. Start the server on the configured port.

The entry point should not contain the entire authentication or command-generation implementation. Those responsibilities belong in separate modules.

### Example structure of `server.js`

```javascript
const express = require("express");
const cors = require("cors");

const commandRoutes = require("./routes/commandRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());

app.use("/api/commands", commandRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

This is an architectural example, not the complete production implementation. Environment configuration, error handling, and authentication security must be completed when we build the server.

---

## 4. Request Flow: First Two Free Generations

### Scenario

A new user visits Prompt2CLI without signing in.

The user enters a prompt and clicks **Generate Terminal Command**.

### Request flow

```text
User
 |
 | Enters prompt
 v
React Frontend
 |
 | POST /api/commands/generate
 v
Express Server
 |
 v
Command Route
 |
 | Check anonymous usage
 |
 | Usage below 2
 v
OpenAI API
 |
 | Generates terminal command
 v
Express Server
 |
 | Return command and usage information
 v
React Frontend
 |
 +--> Display command
 |
 +--> Copy command to clipboard
 |
 +--> Update usage indicator
```

### Detailed steps

**Step 1: User enters a prompt.**

For example:

`List all files, including hidden files, in the current directory.`

**Step 2: React sends a request to Express.**

The frontend sends an HTTP POST request to:

`POST /api/commands/generate`

The request contains the user's prompt.

**Step 3: Express checks the usage limit.**

The backend determines whether the user is authenticated and how many successful generations the anonymous user has used.

If the user has fewer than two successful generations, the request can proceed.

**Step 4: Express calls the AI provider.**

The command-generation service sends the prompt to the OpenAI API using a secret API key stored on the backend.

**Step 5: The AI provider returns a command.**

For example:

```bash
ls -la
```

**Step 6: Express returns the response.**

The backend returns the generated command to React and records the successful generation.

**Step 7: React displays and copies the command.**

The frontend displays the command and attempts to copy it to the clipboard.

The user can then review the command and manually execute it in their terminal.

### Usage behavior

| Request | User status | Expected behavior |
|---|---|---|
| First | Unauthenticated | Generate command |
| Second | Unauthenticated | Generate command |
| Third | Unauthenticated | Block generation and request authentication |
| Fourth and later | Authenticated | Allow generation, subject to applicable limits |

The usage count should increase only when command generation succeeds.

---

## 5. Request Flow: Third Generation and Authentication

Once the user has successfully generated two commands without an account, the system must prevent another anonymous generation.

### Scenario A: User clicks Generate again

```text
React Frontend
      |
      | POST /api/commands/generate
      v
Express Server
      |
      v
Check Usage Limit
      |
      | Two generations already used
      v
Return AUTH_REQUIRED
      |
      v
React Frontend
      |
      v
Display Login / Signup Prompt
```

The backend returns a response indicating that authentication is required.

For example:

```json
{
    "success": false,
    "code": "AUTH_REQUIRED",
    "message": "Please sign in or create an account to continue."
}
```

React interprets this response and displays the login/signup prompt.

**Important:** The backend must enforce this restriction. Hiding or disabling a button in React alone is not sufficient.

### Scenario B: User clicks Login

The user can also click the Login button in the navigation bar at any time.

The frontend navigates to the login page and submits the user's credentials to the authentication endpoint.

```text
User clicks Login
       |
       v
React Login Page
       |
       | POST /api/auth/login
       v
Express Authentication Route
       |
       v
Validate Credentials
       |
       v
Create Authenticated Session
       |
       v
Return Authentication Result
       |
       v
React Frontend
       |
       v
User Can Generate Commands
```

If the user does not have an account, they can visit the signup page.

The signup endpoint will be:

`POST /api/auth/signup`

The login endpoint will be:

`POST /api/auth/login`

Authentication does not happen merely because the Login button is clicked. The user must provide valid credentials, and the backend must verify them.

After successful authentication, subsequent command-generation requests must identify the authenticated user securely.

---

## 6. API Route Design

We will separate command-generation endpoints from authentication endpoints.

### A. Command Routes

Base path: `/api/commands`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/commands/generate` | Generate a terminal command |
| GET | `/api/commands/usage` | Retrieve the current user's usage information |

The usage endpoint is optional for the initial implementation. We can add it when the frontend needs to display usage information.

### B. Authentication Routes

Base path: `/api/auth`

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Authenticate an existing user |
| POST | `/api/auth/logout` | End the user's authenticated session |
| GET | `/api/auth/me` | Retrieve the currently authenticated user's information |

The authentication endpoints will be implemented separately from command generation.

### Why separate routes?

Command generation and authentication are different responsibilities.

- Command routes handle prompts, AI requests, and usage limits.
- Authentication routes handle account creation, login, and logout.
- The AI service handles communication with the AI provider.

Separating these responsibilities makes the application easier to maintain, test, and extend.

---

## 7. Proposed Backend Folder Structure

```text
server/
|
|-- server.js
|
|-- routes/
|   |-- commandRoutes.js
|   |-- authRoutes.js
|
|-- controllers/
|   |-- commandController.js
|   |-- authController.js
|
|-- services/
|   |-- aiService.js
|
|-- middleware/
|   |-- authMiddleware.js
|   |-- usageMiddleware.js
|   |-- errorMiddleware.js
|
|-- models/
|   |-- User.js
|   |-- Usage.js
|
|-- config/
|   |-- database.js
|
|-- .env
|-- package.json
```

### Responsibility of each folder

| File or folder | Responsibility |
|---|---|
| `server.js` | Initialize Express and register routes |
| `routes/` | Define API endpoints |
| `controllers/` | Process requests and prepare responses |
| `services/` | Implement reusable business logic and AI integration |
| `middleware/` | Handle authentication, usage checks, and request processing |
| `models/` | Define database models |
| `config/` | Store configuration and database connection logic |
| `.env` | Store secrets and environment-specific settings |

This is a proposed structure. We should create files when their responsibilities become necessary rather than creating every file immediately.

---

## 8. How the Free Usage Limit Will Be Enforced

This is an important architectural decision.

The backend must distinguish between anonymous users and authenticated users.

For anonymous users, it must maintain a reliable record of successful generations. When the user reaches two successful generations, the backend must reject further anonymous generation requests.

### Proposed behavior

```text
Incoming Generation Request
          |
          v
Is the user authenticated?
          |
     +----+----+
     |         |
    Yes        No
     |         |
     v         v
Verify       Check Anonymous
Identity     Usage Count
     |         |
     |     +---+---+
     |     |       |
     |    < 2     >= 2
     |     |       |
     |     v       v
     |   Generate  Require
     |   Command   Login
     |     |
     +-----+
       |
       v
 Return Response
```

For authenticated users, the backend can apply whatever usage policy the product eventually adopts.

For anonymous users, the application needs a way to recognize returning visitors. A server-managed anonymous identifier or another carefully designed mechanism can be used. A simple React counter or an easily reset browser value is not reliable enforcement.

If usage records must persist across devices, browsers, or sessions, the identity and persistence strategy must account for that requirement.

---

## 9. Technology Responsibilities

### React Frontend

React is responsible for:

- Rendering the interface.
- Accepting natural-language prompts.
- Sending requests to the backend.
- Displaying generated commands.
- Copying commands to the clipboard.
- Showing errors and authentication prompts.
- Displaying login and signup forms.

React should not contain the OpenAI secret API key.

### Express Backend

Express is responsible for:

- Receiving frontend requests.
- Validating incoming prompts.
- Enforcing anonymous usage limits.
- Calling the AI provider.
- Managing authentication endpoints.
- Returning consistent responses.
- Handling errors.

### OpenAI API

The AI provider is responsible for processing the prompt and generating a suitable terminal command.

The API key must remain on the server, and the backend should constrain the model's output to the expected format.

### Database

A database will be needed when persistent user accounts and usage records are implemented.

It can store user information, authentication-related data, and any usage records required by the design.

---

## 10. Security Considerations

1. **Protect API keys:** Never expose the AI provider's secret key in frontend code or commit it to GitHub.
2. **Validate input:** Reject empty, malformed, or excessively long prompts.
3. **Enforce limits on the server:** Do not trust frontend counters.
4. **Secure authentication:** Use established password hashing and session or token-management practices.
5. **Protect user sessions:** Configure authentication cookies or tokens securely.
6. **Rate-limit requests:** Protect the backend against excessive requests and unexpected AI API costs.
7. **Review generated commands:** Display commands for review and never execute them automatically on the user's computer.

These controls will be implemented progressively as the backend is developed.

---

## 11. Architecture Decisions

| Decision ID | Decision | Reason |
|---|---|---|
| ADR-01 | Use Express as the backend framework | Provides an HTTP API for the React frontend |
| ADR-02 | Use `server.js` as the Express entry point | Centralizes server initialization and route registration |
| ADR-03 | Separate command and authentication routes | Keeps responsibilities organized |
| ADR-04 | Call the AI provider from the backend | Protects secret API credentials |
| ADR-05 | Enforce the free usage limit on the backend | Prevents reliance on frontend-only restrictions |
| ADR-06 | Return an authentication-required response after two successful anonymous generations | Allows React to display the login/signup prompt |
| ADR-07 | Never execute generated commands automatically | Keeps the user in control of execution |

## 12. Implementation Plan

The backend will be developed in the following order:

1. Initialize the Node.js project and create the Express entry point.
2. Start the Express server and verify that it responds.
3. Create the command-generation route.
4. Integrate the AI provider through a dedicated service.
5. Connect the React frontend to the backend.
6. Implement anonymous usage tracking and enforce the two-generation limit.
7. Create signup and login routes.
8. Add authentication middleware and persistent user storage.
9. Test success cases, failure cases, and authentication boundaries.
10. Deploy the application securely.

This sequence allows us to test each layer before introducing more complexity.

## 13. Summary

Prompt2CLI will use a React frontend and an Express backend. The Express entry point, `server.js`, will initialize the application and register separate command-generation and authentication routes.

Unauthenticated users can generate two commands successfully. Further anonymous generation attempts will be blocked, and the frontend will prompt the user to sign in or sign up. Once authenticated, users can continue generating commands according to the application's configured usage policy.

The backend will handle AI integration, authentication, and usage enforcement, while React will handle the interface and clipboard interactions.

The architecture is designed to be modular, secure, and easy to extend as Prompt2CLI develops.