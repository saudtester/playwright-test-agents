
# Playwright Test Agents Portfolio

An AI-assisted test automation project demonstrating how specialized Playwright Test Agents can plan test scenarios, generate automated tests, and investigate test failures using GitHub Copilot and the Playwright MCP server.

## Project Overview

This project uses SauceDemo to demonstrate a structured workflow for AI-assisted browser testing.

The workflow separates test planning from test implementation and failure investigation, keeping scenarios and expected results documented independently of the test code.

## Playwright Test Agents

- **Planner:** Explores the application and creates a test plan with scenarios, steps, and expected results.
- **Generator:** Creates Playwright tests from the approved test plan.
- **Healer:** Investigates failing tests, diagnoses root causes, and helps correct test issues without hiding genuine application defects.

## Current Test Coverage

The login flow currently includes five scenarios:

1. Successful login with a standard user.
2. Login with an invalid username.
3. Login with an invalid password.
4. Login attempt with a locked-out user.
5. Login with empty credentials.

The suite is configured to run across Chromium, Firefox, and WebKit.

## Tech Stack

- JavaScript
- Playwright Test
- GitHub Copilot
- Playwright Test Agents
- Model Context Protocol (MCP)
- Visual Studio Code

## Project Structure

```text
playwright-test-agents-v2/
├── .github/
│   ├── agents/
│   │   ├── playwright-test-planner.agent.md
│   │   ├── playwright-test-generator.agent.md
│   │   └── playwright-test-healer.agent.md
│   └── workflows/
├── .vscode/
│   └── mcp.json
├── specs/
│   ├── README.md
│   └── login-flow-test-plan.md
├── tests/
│   ├── login/
│   │   ├── empty-credentials.spec.js
│   │   ├── invalid-password.spec.js
│   │   ├── invalid-username.spec.js
│   │   ├── locked-out-user.spec.js
│   │   └── successful-login.spec.js
│   └── seed.spec.ts
├── .gitignore
├── package.json
└── playwright.config.js
```

## Getting Started

### Prerequisites

- Node.js and npm
- Visual Studio Code
- GitHub Copilot access for using the specialized agents

### Install Dependencies

```bash
npm install
npx playwright install
```

### Run Tests

Run the full test suite:

```bash
npm test
```

Run only the login scenarios:

```bash
npm run test:login
```

Run the full suite in Chromium:

```bash
npm run test:chromium
```

List the available login tests without executing them:

```bash
npm run test:login -- --list
```

### View the HTML Report

```bash
npm run report
```

Run tests first to generate the report.

## Test Plan

See [Login Flow Test Plan](specs/login-flow-test-plan.md) for the scenarios, steps, and expected results used to generate the login tests.

## Project Goals

- Demonstrate AI-assisted test planning and test generation.
- Use reusable Playwright Test patterns and clear assertions.
- Investigate failures systematically rather than blindly changing assertions.
- Keep test plans, generated tests, and failure analysis organized and traceable.
