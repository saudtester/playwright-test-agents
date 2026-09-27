// spec: specs/login-flow-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Login flow', () => {
  test('Successful login with standard_user', async ({ page }) => {
    // 1. Start with a fresh browser context or clear existing session state, then navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Fill Username with standard_user and Password with secret_sauce.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
    await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

    // 3. Click Login.
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
    await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
    await expect(page.getByRole('alert')).toHaveCount(0);
  });

  test('Reject unrecognized username', async ({ page }) => {
    // 1. Start with a fresh browser context or clear existing session state, then navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // 2. Fill Username with not_a_user and Password with secret_sauce.
    await page.locator('[data-test="username"]').fill('not_a_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await expect(page.locator('[data-test="username"]')).toHaveValue('not_a_user');
    await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

    // 3. Click Login.
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('alert')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Reject incorrect password', async ({ page }) => {
    // 1. Start with a fresh browser context or clear existing session state, then navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // 2. Fill Username with standard_user and Password with incorrect_password.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('incorrect_password');
    await expect(page.locator('[data-test="username"]')).toHaveValue('standard_user');
    await expect(page.locator('[data-test="password"]')).toHaveValue('incorrect_password');

    // 3. Click Login.
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('alert')).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Reject locked-out user', async ({ page }) => {
    // 1. Start with a fresh browser context or clear existing session state, then navigate to https://www.saucedemo.com/.
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // 2. Fill Username with locked_out_user and Password with secret_sauce.
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await expect(page.locator('[data-test="username"]')).toHaveValue('locked_out_user');
    await expect(page.locator('[data-test="password"]')).toHaveValue('secret_sauce');

    // 3. Click Login.
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByRole('alert')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });
});
