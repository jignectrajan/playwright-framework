import { test } from '@playwright/test';
import { assert } from 'chai';
import { CustomerLoginPage } from '../../pageobject/customerLoginPO';
import { AccountPage } from '../../pageobject/accountPO';
import { createStepLogger } from '../../utilities/stepLogger';
const step = createStepLogger();

test.describe('Customer Login and Transactions Test', () => {
  test('Verify that user can login, deposit amount, and withdraw amount successfully', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    step('Logging in as Harry Potter');
    await loginPage.goToLoginPage();
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLogin();

    const loggedInName = await page.locator('.fontBig').innerText();
    assert.include(loggedInName, 'Harry Potter', 'User should be logged in as Harry Potter');

    step('Depositing 5000');
    await accountPage.depositAmount('5000');
    const depositMessage = await accountPage.getMessageText();
    assert.strictEqual(depositMessage?.trim(), 'Deposit Successful', 'Deposit message should match');

    const depositTxn = await accountPage.getLatestTransaction();
    assert.strictEqual(depositTxn.amount, '5000', 'Deposit amount should be 5000');
    assert.strictEqual(depositTxn.type, 'Credit', 'Transaction type should be Credit');

    step('Withdrawing 2000');
    await accountPage.withdrawAmount('2000');
    const withdrawMessage = await accountPage.getMessageText();
    assert.strictEqual(withdrawMessage?.trim(), 'Transaction successful', 'Withdraw message should match');

    const withdrawTxn = await accountPage.getLatestTransaction();
    assert.strictEqual(withdrawTxn.amount, '2000', 'Withdraw amount should be 2000');
    assert.strictEqual(withdrawTxn.type, 'Debit', 'Transaction type should be Debit');
  });

  test('Verify that customer sees accurate balance after transactions', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    step('Navigating to login page');
    await loginPage.goToLoginPage();

    step('Logging in as Harry Potter');
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLogin();

    step('Verifying customer login');
    const welcomeText = await page.locator('.fontBig').textContent();
    assert.ok(welcomeText?.includes('Harry Potter'), 'Customer name not visible after login');

    step('Depositing ₹5000');
    await accountPage.depositAmount('5000');
    const depositMsg = await accountPage.getMessageText();
    assert.equal(depositMsg?.trim(), 'Deposit Successful', 'Deposit message incorrect');

    step('Withdrawing ₹2000');
    await accountPage.withdrawAmount('2000');
    const withdrawMsg = await accountPage.getMessageText();
    assert.equal(withdrawMsg?.trim(), 'Transaction successful', 'Withdraw message incorrect');

    step('Validating final balance');
    const balanceText = await accountPage.getBalanceAmount();
    const balance = parseInt(balanceText || '0');
    assert.equal(balance, 3000, `Expected balance 3000, but got ${balance}`);
  });
});
