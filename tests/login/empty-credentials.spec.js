// spec: specs/login-flow-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {
  test('Empty username and password', async ({ page }) => {
    const username = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');
    const loginError = page.getByRole('alert');

    // 1. Start from a fresh browser state and navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(username).toHaveValue('');
    await expect(password).toHaveValue('');

    // 2. Without entering any text, click Login.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginError).toHaveText('Epic sadface: Username is required');
    await expect(username).toHaveValue('');
    await expect(password).toHaveValue('');
  });
});
