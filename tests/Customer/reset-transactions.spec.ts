import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../pages/CustomerLoginPage';
import { AccountPage } from '../../pages/AccountPage';
import * as assert from 'assert';

test('Reset button should clear transaction list', async ({ page }) => {
  console.log('Navigating to banking app and logging in as Harry Potter');
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  const customerLogin = new CustomerLoginPage(page);
  await customerLogin.loginAsCustomer('Harry Potter');

  const accountPage = new AccountPage(page);

  console.log('Performing deposit of 1000');
  await accountPage.depositAmount('1000');

  console.log('Performing withdrawal of 500');
  await accountPage.withdrawAmount('500');

  console.log('Navigating to Transactions tab');
  await accountPage.navigateToTransactions();

  const txnBeforeReset = await accountPage.getTransactionCount();
  console.log(`🧾 Transactions before reset: ${txnBeforeReset}`);
  assert.ok(txnBeforeReset > 0, 'There should be at least one transaction before reset');

  console.log('Clicking Reset button');
  await accountPage.clickResetButton();

  const txnAfterReset = await accountPage.getTransactionCount();
  console.log(`🗑️ Transactions after reset: ${txnAfterReset}`);
  assert.strictEqual(txnAfterReset, 0, 'All transactions should be cleared after reset');
});
