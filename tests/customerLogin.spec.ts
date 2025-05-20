import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../pages/CustomerLoginPage';
import { AccountPage } from '../pages/AccountPage';

test.describe('Customer Login and Transactions Test', () => {
    test('Harry Potter login, deposit 5000, withdraw 2000', async ({ page }) => {
        const loginPage = new CustomerLoginPage(page);
        const accountPage = new AccountPage(page);

        // Step 1: Navigate to login and log in as Harry Potter
        await loginPage.goToLoginPage();
        await loginPage.clickCustomerLogin();
        await loginPage.selectCustomer('Harry Potter');
        await loginPage.clickLogin();

        // Assertion: Check that user is logged in
        await expect(page.locator('.fontBig')).toContainText('Harry Potter');

        // Step 2: Deposit 5000
        await accountPage.depositAmount('5000');
        const depositMessage = await accountPage.getMessageText();
        expect(depositMessage?.trim()).toContain('Deposit Successful');
        await accountPage.verifyTransaction('5000', 'Credit');


        // Step 3: Withdraw 2000
        await accountPage.withdrawAmount('2000');
        const withdrawMessage = await accountPage.getMessageText();
        expect(withdrawMessage?.trim()).toContain('Transaction successful');
        await accountPage.verifyTransaction('2000', 'Debit');
    });
});
