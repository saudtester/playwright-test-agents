// spec: specs/login-flow-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {
  test('Invalid username with valid password', async ({ page }) => {
    const username = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');
    const loginError = page.getByRole('alert');

    // 1. Start from a fresh browser state and navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(username).toHaveValue('');
    await expect(password).toHaveValue('');

    // 2. Enter invalid_user in Username and secret_sauce in Password.
    await username.fill('invalid_user');
    await password.fill('secret_sauce');
    await expect(username).toHaveValue('invalid_user');
    await expect(password).toHaveValue('secret_sauce');

    // 3. Click Login.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginError).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(username).toHaveValue('invalid_user');
    await expect(password).toHaveValue('secret_sauce');
  });
});
