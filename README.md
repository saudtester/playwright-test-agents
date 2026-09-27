# Playwright Test Agents — AI-Powered Test Planning, Generation & Healing

A practical QA automation portfolio demonstrating how Playwright Test Agents can support the software testing workflow from test planning through test generation, execution, failure investigation, and test healing.

The project uses real Playwright tests against the SauceDemo application and focuses on demonstrating practical QA engineering skills rather than adding unnecessary complexity.

## Workflow

```text
Application
    ↓
Planner
    ↓
Markdown Test Plan
    ↓
Generator
    ↓
Playwright Tests
    ↓
Real Test Execution
    ↓
Test Failure
    ↓
Healer
    ↓
Diagnosis / Test Correction
    ↓
Verified Result
```

The workflow demonstrates a human-in-the-loop approach where generated tests are executed and reviewed rather than blindly accepting AI-generated results.

## What This Portfolio Demonstrates

* Playwright Test Agents
* AI-assisted test planning
* AI-assisted test generation
* AI-assisted test healing
* JavaScript and Playwright Test
* Real browser test execution
* Test plan to automated test workflow
* Selector validation against a live application
* Independent test scenarios
* Functional and negative testing
* Failure investigation
* Distinguishing test-generation issues from application defects
* Cross-browser test execution
* Git and GitHub workflow

## Project Structure

```text
playwright-test-agents/
│
├── .github/
│   ├── agents/
│   │   ├── playwright-test-generator.agent.md
│   │   ├── playwright-test-healer.agent.md
│   │   └── playwright-test-planner.agent.md
│   │
│   └── workflows/
│       └── copilot-setup-steps.yml
│
├── .vscode/
│   ├── mcp.json
│   └── settings.json
│
├── specs/
│   ├── README.md
│   ├── login-flow-test-plan.md
│   └── saucedemo-checkout-test-plan.md
│
├── tests/
│   ├── login-flow.spec.js
│   └── checkout-flow.spec.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.js
```

## Test Agent Experiments

### 1. Login Flow — Generator + Healer

The Planner created a test plan covering:

* Successful login
* Invalid username
* Invalid password
* Locked-out user

The Generator converted the plan into Playwright tests and verified the application selectors against SauceDemo.

During execution, one generated locator matched multiple elements and caused a Playwright strict-mode failure.

The Healer investigated the failure and replaced the ambiguous locator with a unique selector.

The corrected test suite was then executed across Chromium, Firefox, and WebKit.

**Result:**

```text
12 tests passed
```

This demonstrates a complete:

```text
Plan → Generate → Execute → Fail → Heal → Verify
```

workflow.

### 2. Checkout Flow — Detecting a Real Application Defect

The Planner created a seven-scenario checkout test plan covering:

* Successful product purchase
* Required first-name validation
* Required last-name validation
* Required postal-code validation
* Cancel checkout behavior
* Removing the only cart item
* Preventing checkout completion with an empty cart

The Generator created independent Playwright tests from the plan.

One scenario intentionally checks that an empty cart should not be allowed to complete checkout.

During execution, SauceDemo allowed an empty cart to proceed to the checkout overview and displayed:

```text
Item total: $0
Tax: $0.00
Total: $0.00
```

The Healer investigated the failure and confirmed that the test was correctly detecting an application behavior that contradicted the expected requirement.

Instead of weakening the assertion to make the test pass, the Healer left the failure intact.

This demonstrates an important QA principle:

> A failing automated test does not always mean the test is wrong.

The failure can represent a genuine application defect.

## Test Execution

Run all tests with:

```bash
npx playwright test
```

Run the login tests:

```bash
npx playwright test tests/login-flow.spec.js
```

Run the checkout tests:

```bash
npx playwright test tests/checkout-flow.spec.js
```

Run the empty-cart scenario:

```bash
npx playwright test tests/checkout-flow.spec.js --grep "Prevent completing checkout with an empty cart"
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

## Tech Stack

* Playwright
* JavaScript
* Node.js
* Playwright Test
* Playwright Test Agents
* Git
* GitHub
* GitHub Actions
* VS Code
* GitHub Copilot

## Test Agent Configuration

The project includes the Playwright Test Agent definitions:

* `playwright-test-planner.agent.md`
* `playwright-test-generator.agent.md`
* `playwright-test-healer.agent.md`

The project also includes the Playwright Test MCP configuration used by the Test Agent workflow.

## QA Approach

The portfolio focuses on practical QA principles:

* Start from clear test requirements.
* Generate tests from documented scenarios.
* Verify generated selectors and expected behavior against the application.
* Execute the generated tests instead of assuming they pass.
* Investigate failures before changing tests.
* Make the minimum necessary correction when the test itself is wrong.
* Preserve failures when they represent genuine application defects.
* Use independent test state to avoid test-order dependencies.
* Validate results across multiple browsers where appropriate.

## Purpose

This project demonstrates practical experience applying AI-assisted testing to a real Playwright automation workflow.

The goal is not to replace QA judgment with AI, but to show how Test Agents can assist with planning, test creation, investigation, and maintenance while keeping test validation and quality decisions under human review.
