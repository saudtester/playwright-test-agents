# SauceDemo Checkout Workflow Test Plan

## Application Overview

Exercise SauceDemo from a fresh browser context at https://www.saucedemo.com/ through login, product selection, cart, checkout, and confirmation. Use standard_user / secret_sauce and Sauce Labs Backpack ($29.99) for the main path. Verified routes are /inventory.html, /inventory-item.html?id=4, /cart.html, /checkout-step-one.html, /checkout-step-two.html, and /checkout-complete.html. Live checkout errors are “Error: First Name is required”, “Error: Last Name is required”, and “Error: Postal Code is required”. The live app accepts a nonnumeric postal value such as ABC! and advances to the overview; no format validation was observed, so do not treat a particular postal pattern as required unless product rules define one. Known cart gap: an empty cart can proceed through checkout and Finish, showing item total $0, tax $0.00, total $0.00, and reaching order confirmation. The empty-cart scenario below records the desired negative acceptance criterion and this current live failure.

## Test Scenarios

### 1. SauceDemo checkout workflow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Complete a successful backpack purchase

**File:** `tests/checkout-flow.spec.js`

**Steps:**
  1. Start from a fresh browser context and navigate to https://www.saucedemo.com/.
    - expect: The Swag Labs login page appears with Username, Password, and Login controls.
  2. Enter standard_user and secret_sauce, then select Login.
    - expect: The page navigates to https://www.saucedemo.com/inventory.html.
  3. Select the Sauce Labs Backpack product by its title link.
    - expect: The product details page opens at https://www.saucedemo.com/inventory-item.html?id=4.
    - expect: The page identifies Sauce Labs Backpack and shows its $29.99 price.
  4. Select Add to cart, then open the cart.
    - expect: The cart indicator shows 1 item and the product action changes to Remove.
    - expect: The browser opens https://www.saucedemo.com/cart.html with one Sauce Labs Backpack row, quantity 1, and price $29.99.
  5. Select Checkout.
    - expect: The browser opens https://www.saucedemo.com/checkout-step-one.html.
    - expect: The form exposes First Name, Last Name, and Zip/Postal Code fields, plus Cancel and Continue buttons.
  6. Enter Ada, Lovelace, and 10001 in the corresponding fields, then select Continue.
    - expect: The browser opens https://www.saucedemo.com/checkout-step-two.html.
    - expect: The overview contains one Sauce Labs Backpack at $29.99, SauceCard #31337, and Free Pony Express Delivery.
    - expect: The price summary shows Item total: $29.99, Tax: $2.40, and Total: $32.39.
  7. Select Finish.
    - expect: The browser opens https://www.saucedemo.com/checkout-complete.html.
    - expect: The page displays “Thank you for your order!” and the order-dispatch confirmation message.
    - expect: The cart indicator is empty.

#### 1.2. Require first name before continuing checkout

**File:** `tests/checkout-flow.spec.js`

**Steps:**
  1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The browser is on https://www.saucedemo.com/checkout-step-one.html with all three customer fields empty.
  2. Leave all fields blank and select Continue.
    - expect: The browser remains on the checkout information page.
    - expect: An alert displays “Error: First Name is required”.
    - expect: The order overview is not opened.

#### 1.3. Require last name before continuing checkout

**File:** `tests/checkout-flow.spec.js`

**Steps:**
  1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The browser is on https://www.saucedemo.com/checkout-step-one.html.
  2. Enter Ada in First Name, leave Last Name and Zip/Postal Code blank, and select Continue.
    - expect: The browser remains on the checkout information page.
    - expect: An alert displays “Error: Last Name is required”.
    - expect: The order overview is not opened.

#### 1.4. Require postal code before continuing checkout

**File:** `tests/checkout-flow.spec.js`

**Steps:**
  1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The browser is on https://www.saucedemo.com/checkout-step-one.html.
  2. Enter Ada in First Name and Lovelace in Last Name, leave Zip/Postal Code blank, and select Continue.
    - expect: The browser remains on the checkout information page.
    - expect: An alert displays “Error: Postal Code is required”.
    - expect: The order overview is not opened.

#### 1.5. Cancel checkout without losing cart contents

**File:** `tests/checkout-flow.spec.js`

**Steps:**
  1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, open the cart, and select Checkout.
    - expect: The checkout information page opens and the cart indicator shows 1 item.
  2. Select Cancel.
    - expect: The browser returns to https://www.saucedemo.com/cart.html.
    - expect: The Sauce Labs Backpack remains in the cart with quantity 1 and the cart indicator still shows 1 item.

#### 1.6. Remove the only item from the cart

**File:** `tests/checkout-flow.spec.js`

**Steps:**
  1. Start from a fresh browser context, log in as standard_user with secret_sauce, add the Sauce Labs Backpack, and open the cart.
    - expect: The cart contains one Sauce Labs Backpack row and the cart indicator shows 1 item.
  2. Select Remove on the backpack row.
    - expect: The backpack row disappears and the cart indicator changes to empty.
    - expect: Continue Shopping remains available.
  3. Select Continue Shopping.
    - expect: The browser returns to https://www.saucedemo.com/inventory.html with an empty cart indicator.

#### 1.7. Prevent completing checkout with an empty cart

**File:** `tests/checkout-flow.spec.js`

**Steps:**
  1. Start from a fresh browser context, log in as standard_user with secret_sauce, and open the cart without adding a product.
    - expect: The browser is on https://www.saucedemo.com/cart.html and the cart indicator is empty.
  2. Select Checkout, enter Ada, Lovelace, and 10001, then select Continue.
    - expect: Expected: checkout should not proceed to the order overview when there are no cart items.
    - expect: Observed live behavior: the site opens /checkout-step-two.html with an empty item list, Item total: $0, Tax: $0.00, Total: $0.00, and an enabled Finish button.
  3. Attempt to complete the empty order by selecting Finish.
    - expect: Expected: completion should be blocked and no order confirmation should be shown.
    - expect: Observed live behavior: the site reaches /checkout-complete.html and displays the normal order confirmation. Record this as a current defect against the expected criterion.
