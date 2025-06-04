import { test } from '@playwright/test';
import { assert } from 'chai';
import { CustomerLoginPage } from '../../pages/CustomerLoginPage';
import { AccountPage } from '../../pages/AccountPage';

test.describe('Customer Login and Transactions Test', () => {
  test('Harry Potter login, deposit 5000, withdraw 2000', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    console.log('🔐 Step 1: Logging in as Harry Potter');
    await loginPage.goToLoginPage();
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLogin();

    const loggedInName = await loginPage.getLoggedInUserName();
    assert.include(loggedInName, 'Harry Potter', 'User should be logged in as Harry Potter');

    console.log('💰 Step 2: Depositing 5000');
    await accountPage.depositAmount('5000');
    const depositMessage = await accountPage.getMessageText();
    assert.strictEqual(depositMessage?.trim(), 'Deposit Successful', 'Deposit message should match');

    const depositTxn = await accountPage.getLatestTransaction();
    assert.strictEqual(depositTxn.amount, '5000', 'Transaction amount should be 5000');
    assert.strictEqual(depositTxn.type, 'Credit', 'Transaction type should be Credit');

    console.log('💸 Step 3: Withdrawing 2000');
    await accountPage.withdrawAmount('2000');
    const withdrawMessage = await accountPage.getMessageText();
    assert.strictEqual(withdrawMessage?.trim(), 'Transaction successful', 'Withdraw message should match');

    const withdrawTxn = await accountPage.getLatestTransaction();
    assert.strictEqual(withdrawTxn.amount, '2000', 'Transaction amount should be 2000');
    assert.strictEqual(withdrawTxn.type, 'Debit', 'Transaction type should be Debit');
  });

  test('Customer should see accurate balance after transactions', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    console.log('🧭 Step 1: Navigating to login page');
    await loginPage.goToLoginPage();

    console.log('🔐 Step 2: Logging in as Harry Potter');
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLogin();

    console.log('✅ Step 3: Verifying customer login');
    const loggedInName = await loginPage.getLoggedInUserName();
    assert.include(loggedInName, 'Harry Potter', 'User should be logged in as Harry Potter');

    console.log('💰 Step 4: Depositing ₹5000');
    await accountPage.depositAmount('5000');
    const depositMsg = await accountPage.getMessageText();
    assert.equal(depositMsg?.trim(), 'Deposit Successful', 'Deposit message incorrect');

    console.log('💸 Step 5: Withdrawing ₹2000');
    await accountPage.withdrawAmount('2000');
    const withdrawMsg = await accountPage.getMessageText();
    assert.equal(withdrawMsg?.trim(), 'Transaction successful', 'Withdraw message incorrect');

    console.log('📊 Step 6: Validating final balance');
    const balanceText = await accountPage.getBalanceAmount();
    const balance = parseInt(balanceText || '0');
    assert.equal(balance, 3000, `Expected balance 3000, but got ${balance}`);
  });
});
