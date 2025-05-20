import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { AccountPage } from '../pages/AccountPage';

test.describe('Withdraw Test (with prior deposit)', () => {
  test('Harry Potter deposits 5000 then withdraws 2000', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    // Step 1: Login
    await loginPage.goToLoginPage();
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLogin();

    // Assertion: Confirm login
    await expect(page.locator('.fontBig')).toContainText('Harry Potter');

    // Step 2: Deposit ₹5000 to enable withdrawal
    await accountPage.depositAmount('5000');
    const depositMessage = await accountPage.getMessageText();
    expect(depositMessage?.trim()).toContain('Deposit Successful');
    await accountPage.verifyTransaction('5000', 'Credit');

    // Step 3: Withdraw ₹2000
    await accountPage.withdrawAmount('2000');
    const withdrawMessage = await accountPage.getMessageText();
    expect(withdrawMessage?.trim()).toContain('Transaction successful');
    await accountPage.verifyTransaction('2000', 'Debit');
  });
});
