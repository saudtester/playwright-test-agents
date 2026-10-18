
# Test Plans

This directory contains test plans created during the Playwright Test Agents workflow.

## Current Test Plans

- **[Login Flow Test Plan](./login-flow-test-plan.md)** — Covers successful login, invalid username, invalid password, locked-out user, and empty credentials on SauceDemo.

## Workflow

1. The **Playwright Test Planner** explores the application and documents scenarios, steps, and expected results.
2. The **Playwright Test Generator** uses the approved plan to generate Playwright tests.
3. The **Playwright Test Healer** investigates failures and helps correct test issues while preserving genuine application defects.

Test plans are maintained separately from test implementation to keep expected behavior clear and traceable.
