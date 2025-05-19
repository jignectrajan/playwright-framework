import { test, expect } from '@playwright/test';

test('Login, add product to cart, and go to checkout', async ({ page }) => {
  // Step 1: Navigate to login page
  await page.goto('https://www.saucedemo.com/v1/');

  // Step 2: Fill login form
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Step 3: Verify navigation to inventory page
  await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');

  // Step 4: Add a product to the cart
  await page.click('//div[text()="Sauce Labs Backpack"]/parent::a/parent::div/following-sibling::div/button');

  // Step 5: Click on cart icon
  await page.click('.shopping_cart_link');

  // Step 6: Verify cart page
  await expect(page).toHaveURL('https://www.saucedemo.com/v1.html');

  // Step 7: Click on checkout
  await page.click('//a[text()="CHECKOUT"]');

  // Step 8: Verify checkout page
  await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-step-one.html');

  // Optionally, fill first checkout form step
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');
  await page.click('//input[@value="CONTINUE"]');

  // Step 9: Verify step two
  await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-step-two.html');
});
