// spec: specs/login-flow-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {
  test('Invalid password with valid username', async ({ page }) => {
    const username = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');
    const loginError = page.getByRole('alert');

    // 1. Start from a fresh browser state and navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(username).toHaveValue('');
    await expect(password).toHaveValue('');

    // 2. Enter standard_user in Username and wrong_password in Password.
    await username.fill('standard_user');
    await password.fill('wrong_password');
    await expect(username).toHaveValue('standard_user');
    await expect(password).toHaveValue('wrong_password');

    // 3. Click Login.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginError).toHaveText('Epic sadface: Username and password do not match any user in this service');
    await expect(username).toHaveValue('standard_user');
    await expect(password).toHaveValue('wrong_password');
  });
});
