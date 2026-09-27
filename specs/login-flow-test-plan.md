# SauceDemo Login Flow Test Plan

## Application Overview

Validate the SauceDemo login form at https://www.saucedemo.com/ for a valid standard account, unrecognized username, incorrect password, and locked-out account. Each scenario starts from an independent fresh login page. The form identifies the username and password fields and displays errors in an alert.

## Test Scenarios

### 1. Login flow

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with standard_user

**File:** `tests/login-flow.spec.js`

**Steps:**
  1. Start with a fresh browser context or clear existing session state, then navigate to https://www.saucedemo.com/.
    - expect: The Swag Labs login page is displayed at the root URL with Username, Password, and Login controls.
  2. Fill Username with standard_user and Password with secret_sauce.
    - expect: Both fields contain the entered credentials.
  3. Click Login.
    - expect: The browser navigates to https://www.saucedemo.com/inventory.html.
    - expect: The inventory page displays the Products label and product content, with no login error alert.

#### 1.2. Reject unrecognized username

**File:** `tests/login-flow.spec.js`

**Steps:**
  1. Start with a fresh browser context or clear existing session state, then navigate to https://www.saucedemo.com/.
    - expect: The Swag Labs login page is displayed at the root URL.
  2. Fill Username with not_a_user and Password with secret_sauce.
    - expect: Both fields contain the entered credentials.
  3. Click Login.
    - expect: The browser remains at https://www.saucedemo.com/.
    - expect: An alert displays: Epic sadface: Username and password do not match any user in this service.
    - expect: The inventory page is not opened.

#### 1.3. Reject incorrect password

**File:** `tests/login-flow.spec.js`

**Steps:**
  1. Start with a fresh browser context or clear existing session state, then navigate to https://www.saucedemo.com/.
    - expect: The Swag Labs login page is displayed at the root URL.
  2. Fill Username with standard_user and Password with incorrect_password.
    - expect: Both fields contain the entered credentials.
  3. Click Login.
    - expect: The browser remains at https://www.saucedemo.com/.
    - expect: An alert displays: Epic sadface: Username and password do not match any user in this service.
    - expect: The inventory page is not opened.

#### 1.4. Reject locked-out user

**File:** `tests/login-flow.spec.js`

**Steps:**
  1. Start with a fresh browser context or clear existing session state, then navigate to https://www.saucedemo.com/.
    - expect: The Swag Labs login page is displayed at the root URL.
  2. Fill Username with locked_out_user and Password with secret_sauce.
    - expect: Both fields contain the entered credentials.
  3. Click Login.
    - expect: The browser remains at https://www.saucedemo.com/.
    - expect: An alert displays: Epic sadface: Sorry, this user has been locked out.
    - expect: The inventory page is not opened.
