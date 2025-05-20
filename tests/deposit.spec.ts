import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { AccountPage } from '../pages/AccountPage';

test.describe('Deposit Test', () => {
  test('Harry Potter deposits 5000', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    // Login steps
    await loginPage.goToLoginPage();
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLogin();

    // Assertion: User logged in
    await expect(page.locator('.fontBig')).toContainText('Harry Potter');

    // Deposit 5000
    await accountPage.depositAmount('5000');
    const depositMessage = await accountPage.getMessageText();
    expect(depositMessage?.trim()).toContain('Deposit Successful');

    // Verify transaction
    await accountPage.verifyTransaction('5000', 'Credit');
  });
});
