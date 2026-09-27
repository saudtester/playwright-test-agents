// spec: specs/saucedemo-checkout-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

const baseUrl = 'https://www.saucedemo.com/';
const inventoryUrl = `${baseUrl}inventory.html`;
const cartUrl = `${baseUrl}cart.html`;
const checkoutInfoUrl = `${baseUrl}checkout-step-one.html`;
const checkoutOverviewUrl = `${baseUrl}checkout-step-two.html`;
const checkoutCompleteUrl = `${baseUrl}checkout-complete.html`;

test.describe('SauceDemo checkout workflow', () => {
  test('Complete a successful backpack purchase', async ({ page }) => {
    // 1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    await page.goto(baseUrl);
    await expect(page).toHaveURL(baseUrl);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    // 2. Enter standard_user and secret_sauce, then select Login.
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(inventoryUrl);

    // 3. Select the Sauce Labs Backpack product by its title link.
    await page.locator('[data-test="item-4-title-link"]').click();
    await expect(page).toHaveURL(`${baseUrl}inventory-item.html?id=4`);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();

    // 4. Select Add to cart, then open the cart.
    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Remove' })).toBeVisible();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(cartUrl);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();

    // 5. Select Checkout.
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(checkoutInfoUrl);
    await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Zip/Postal Code' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible();

    // 6. Enter Ada, Lovelace, and 10001 in the corresponding fields, then select Continue.
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(checkoutOverviewUrl);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('$29.99', { exact: true })).toBeVisible();
    await expect(page.getByText('SauceCard #31337', { exact: true })).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!', { exact: true })).toBeVisible();
    await expect(page.getByText('Item total: $29.99', { exact: true })).toBeVisible();
    await expect(page.getByText('Tax: $2.40', { exact: true })).toBeVisible();
    await expect(page.getByText('Total: $32.39', { exact: true })).toBeVisible();

    // 7. Select Finish.
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(checkoutCompleteUrl);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
  });

  test('Require first name before continuing checkout', async ({ page }) => {
    // 1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto(baseUrl);
    await expect(page).toHaveURL(baseUrl);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(inventoryUrl);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(cartUrl);
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(checkoutInfoUrl);
    await expect(page.locator('[data-test="firstName"]')).toHaveValue('');
    await expect(page.locator('[data-test="lastName"]')).toHaveValue('');
    await expect(page.locator('[data-test="postalCode"]')).toHaveValue('');

    // 2. Leave all fields blank and select Continue.
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(checkoutInfoUrl);
    await expect(page.getByRole('alert')).toContainText('Error: First Name is required');
  });

  test('Require last name before continuing checkout', async ({ page }) => {
    // 1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto(baseUrl);
    await expect(page).toHaveURL(baseUrl);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(inventoryUrl);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(cartUrl);
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(checkoutInfoUrl);

    // 2. Enter Ada in First Name, leave Last Name and Zip/Postal Code blank, and select Continue.
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(checkoutInfoUrl);
    await expect(page.getByRole('alert')).toContainText('Error: Last Name is required');
  });

  test('Require postal code before continuing checkout', async ({ page }) => {
    // 1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto(baseUrl);
    await expect(page).toHaveURL(baseUrl);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(inventoryUrl);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(cartUrl);
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(checkoutInfoUrl);

    // 2. Enter Ada in First Name and Lovelace in Last Name, leave Zip/Postal Code blank, and select Continue.
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL(checkoutInfoUrl);
    await expect(page.getByRole('alert')).toContainText('Error: Postal Code is required');
  });

  test('Cancel checkout without losing cart contents', async ({ page }) => {
    // 1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, open the cart, and select Checkout.
    await page.goto(baseUrl);
    await expect(page).toHaveURL(baseUrl);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(inventoryUrl);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(cartUrl);
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(checkoutInfoUrl);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();

    // 2. Select Cancel.
    await page.locator('[data-test="cancel"]').click();
    await expect(page).toHaveURL(cartUrl);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
  });

  test('Remove the only item from the cart', async ({ page }) => {
    // 1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, and open the cart.
    await page.goto(baseUrl);
    await expect(page).toHaveURL(baseUrl);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(inventoryUrl);
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(cartUrl);
    await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

    // 2. Select Remove on the backpack row.
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continue Shopping' })).toBeVisible();

    // 3. Select Continue Shopping.
    await page.locator('[data-test="continue-shopping"]').click();
    await expect(page).toHaveURL(inventoryUrl);
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();
  });

  test('Prevent completing checkout with an empty cart', async ({ page }) => {
    // 1. Start from a fresh browser context, log in as standard_user with secret_sauce, and open the cart without adding a product.
    await page.goto(baseUrl);
    await expect(page).toHaveURL(baseUrl);
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(inventoryUrl);
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(cartUrl);
    await expect(page.getByRole('button', { name: 'Cart, empty' })).toBeVisible();

    // 2. Select Checkout, enter Ada, Lovelace, and 10001, then select Continue. Expected: checkout should not proceed to the order overview.
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(checkoutInfoUrl);
    await page.locator('[data-test="firstName"]').fill('Ada');
    await page.locator('[data-test="lastName"]').fill('Lovelace');
    await page.locator('[data-test="postalCode"]').fill('10001');
    await page.locator('[data-test="continue"]').click();

    // Expected: checkout should remain on the information step.
    // Actual SauceDemo behavior: an empty cart proceeds to the overview.
    await expect(page).toHaveURL(checkoutInfoUrl);

    // 3. Expected: Finish should be blocked and no confirmation should appear.
    await expect(page.getByRole('button', { name: 'Finish' })).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toHaveCount(0);
  });
});
