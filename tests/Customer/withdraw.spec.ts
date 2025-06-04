import { test } from '@playwright/test';
import { assert } from 'chai';
import { CustomerLoginPage } from '../../pages/CustomerLoginPage';
import { AccountPage } from '../../pages/AccountPage';

test.describe('Withdraw Test (with prior deposit)', () => {
  test('Harry Potter deposits 5000 then withdraws 2000', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    console.log('🔐 Step 1: Logging in as Harry Potter');
    await loginPage.goToLoginPage();
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLogin();

    const loggedInName = await page.locator('.fontBig').innerText();
    assert.include(loggedInName, 'Harry Potter', 'User should be logged in as Harry Potter');

    console.log('💰 Step 2: Depositing ₹5000');
    await accountPage.depositAmount('5000');
    const depositMessage = await accountPage.getMessageText();
    assert.strictEqual(depositMessage?.trim(), 'Deposit Successful', 'Deposit message should match');
    const depositTransaction = await accountPage.getLatestTransaction();
    assert.strictEqual(depositTransaction.amount, '5000', 'Deposit transaction amount should be 5000');
    assert.strictEqual(depositTransaction.type, 'Credit', 'Deposit transaction type should be Credit');

    console.log('💸 Step 3: Withdrawing ₹2000');
    await accountPage.withdrawAmount('2000');
    const withdrawMessage = await accountPage.getMessageText();
    assert.strictEqual(withdrawMessage?.trim(), 'Transaction successful', 'Withdraw message should match');
    const withdrawTransaction = await accountPage.getLatestTransaction();
    assert.strictEqual(withdrawTransaction.amount, '2000', 'Withdraw transaction amount should be 2000');
    assert.strictEqual(withdrawTransaction.type, 'Debit', 'Withdraw transaction type should be Debit');
  });

  test('Customer should not be able to withdraw more than available balance', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    console.log('🔐 Step 1: Logging in as Harry Potter');
    await loginPage.goToLoginPage();
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLogin();

    const loggedInText = await page.locator('.fontBig').innerText();
    assert.include(loggedInText, 'Harry Potter', 'User should be logged in');

    console.log('💰 Step 2: Depositing ₹1000');
    await accountPage.depositAmount('1000');
    const depositMsg = await accountPage.getMessageText();
    assert.strictEqual(depositMsg?.trim(), 'Deposit Successful', 'Deposit should succeed');
    const depositTransaction = await accountPage.getLatestTransaction();
    assert.strictEqual(depositTransaction.amount, '1000', 'Deposit transaction amount should be 1000');
    assert.strictEqual(depositTransaction.type, 'Credit', 'Deposit transaction type should be Credit');

    console.log('🚫 Step 3: Attempting to withdraw ₹2000 (more than balance)');
    await accountPage.withdrawAmount('2000');
    const errorMsg = await accountPage.getMessageText();

    assert.strictEqual(
      errorMsg?.trim(),
      'Transaction Failed. You can not withdraw amount more than the balance.',
      'Should block overdraft'
    );
  });

  test('Verify balance after deposit and withdrawal', async ({ page }) => {
    const loginPage = new CustomerLoginPage(page);
    const accountPage = new AccountPage(page);

    console.log('🔐 Step 1: Logging in as Harry Potter');
    await loginPage.goToLoginPage();
    await loginPage.clickCustomerLogin();
    await loginPage.selectCustomer('Harry Potter');
    await loginPage.clickLogin();

    const loggedInName = await page.locator('.fontBig').innerText();
    assert.include(loggedInName, 'Harry Potter', 'User should be logged in as Harry Potter');

    console.log('💰 Step 2: Depositing ₹5000');
    await accountPage.depositAmount('5000');
    const depositMessage = await accountPage.getMessageText();
    assert.strictEqual(depositMessage?.trim(), 'Deposit Successful', 'Deposit message should match');

    // Verify balance after deposit
    const balanceAfterDeposit = await accountPage.getBalanceAmount();
    console.log(`🧮 Balance after deposit: ₹${balanceAfterDeposit}`);
    assert.strictEqual(balanceAfterDeposit, '5000', 'Balance should be 5000 after deposit');

    console.log('💸 Step 3: Withdrawing ₹2000');
    await accountPage.withdrawAmount('2000');
    const withdrawMessage = await accountPage.getMessageText();
    assert.strictEqual(withdrawMessage?.trim(), 'Transaction successful', 'Withdraw message should match');

    // Verify balance after withdrawal
    const balanceAfterWithdrawal = await accountPage.getBalanceAmount();
    console.log(`🧮 Balance after withdrawal: ₹${balanceAfterWithdrawal}`);
    assert.strictEqual(balanceAfterWithdrawal, '3000', 'Balance should be 3000 after withdrawal');
  });
});
