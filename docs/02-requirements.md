Prompt2CLI — Requirements

1. Introduction

This document defines the functional and non-functional requirements of Prompt2CLI. It describes the expected system behavior, business rules, and acceptance criteria for the initial version of the application.

2. User Requirements

UR-01: Generate Terminal Commands

Users should be able to enter instructions in plain English and receive the corresponding terminal command.

UR-02: Automatic Clipboard Copying

Users should be able to obtain generated commands without manually selecting and copying the output. The generated command should be copied to the clipboard automatically.

UR-03: Free Usage Without Registration

Users should be able to generate two terminal commands without creating an account.

UR-04: Authentication After Free Usage

After using their two free generations, users should be prompted to sign in or create an account to continue generating commands.

UR-05: Access Informational Pages

Users should be able to access the Home, About, and Contact pages through the application's navigation.

3. Functional Requirements

FR-01: Accept User Input

The system must allow users to enter a natural-language description of the task they want to perform.

FR-02: Generate Commands

The system must process a valid prompt and return a corresponding terminal command.

FR-03: Copy Generated Commands

The system must automatically copy a successfully generated command to the user's clipboard, subject to browser clipboard permissions.

FR-04: Track Anonymous Usage

The system must track the number of successful command generations made by an unauthenticated user.

FR-05: Enforce the Free Usage Limit

The system must allow an unauthenticated user to generate a maximum of two commands successfully.

FR-06: Prompt for Authentication

After an unauthenticated user reaches the two-generation limit, the system must display a prompt offering sign-in or sign-up.

FR-07: Block Additional Anonymous Generations

The system must prevent an unauthenticated user from generating additional commands after reaching the free usage limit.

FR-08: Handle Failed Generations

Failed command-generation attempts must not count toward the two-generation limit.

FR-09: Provide Navigation

The system must allow users to navigate between the Home, About, and Contact pages.

4. Non-Functional Requirements

NFR-01: Security

AI provider API keys and other sensitive credentials must not be exposed in frontend code.

NFR-02: Reliability

The application must display an appropriate error message when command generation fails.

NFR-03: Usability

The interface should be simple and usable for both experienced developers and beginners.

NFR-04: Responsiveness

The application should work on desktop and mobile screens.

NFR-05: Usage Enforcement

The anonymous generation limit must be enforced by the backend rather than relying exclusively on frontend state.

5. Business Rules

- BR-01: Unauthenticated users receive two successful command generations for free.
- BR-02: Failed generation attempts do not consume the free usage allowance.
- BR-03: A third generation attempt requires authentication.
- BR-04: Generated commands must be reviewed by the user before execution.
- BR-05: The application must never execute generated commands automatically on the user's computer.

6. Acceptance Criteria

AC-01: Successful Free Generations

Given an unauthenticated user who has not generated any commands,
When the user submits two valid prompts and both generations succeed,
Then both commands are returned successfully.

AC-02: Third Generation Attempt

Given an unauthenticated user who has generated two commands successfully,
When the user attempts to generate another command,
Then the system blocks the request and displays the sign-in or sign-up prompt.

AC-03: Failed Generation

Given an unauthenticated user who has generated one command successfully,
When the next generation attempt fails,
Then the failed attempt does not consume the remaining free generation.

AC-04: Automatic Clipboard Copying

Given a command has been generated successfully and clipboard access is permitted,
When the generation completes,
Then the command is copied to the clipboard.

AC-05: Navigation

Given a user is on any available page,
When the user selects Home, About, or Contact from the navigation,
Then the corresponding page is displayed.

7. Constraints and Assumptions

- The frontend is built using React and Vite.
- The backend is planned to use Node.js and Express.
- An AI provider will be integrated to generate terminal commands.
- Authentication and persistent usage tracking will be implemented as the backend develops.
- The exact mechanism for identifying anonymous users remains to be decided.

8. Future Requirements

Potential features that have not yet been committed to the initial release should be recorded separately in "feature-backlog.md".

Examples include command explanations, command history, saved commands, and additional authentication options.