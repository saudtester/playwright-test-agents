// spec: specs/login-flow-test-plan.md
// seed: tests/seed.spec.ts

const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {
  test('Successful login with standard user', async ({ page }) => {
    const username = page.locator('[data-test="username"]');
    const password = page.locator('[data-test="password"]');

    // 1. Start from a fresh browser state and navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(username).toHaveValue('');
    await expect(password).toHaveValue('');
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user in Username and secret_sauce in Password.
    await username.fill('standard_user');
    await password.fill('secret_sauce');
    await expect(username).toHaveValue('standard_user');
    await expect(password).toHaveValue('secret_sauce');

    // 3. Click Login.
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.getByRole('alert')).toHaveCount(0);
  });
});
