import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../pageobject/customerLoginPage';
import { AccountPage } from '../../pageobject/accountPage';
import * as assert from 'assert';
import { BASE_URL } from '../../constants';
import { createStepLogger } from '../../utilities/stepLogger';
const step = createStepLogger();

test('Reset button should clear transaction list', async ({ page }) => {
  step('Navigating to banking app and logging in as Harry Potter');
  await page.goto(BASE_URL);
  const customerLogin = new CustomerLoginPage(page);
  await customerLogin.loginAsCustomer('Harry Potter');

  const accountPage = new AccountPage(page);

  step('Performing deposit of 1000');
  await accountPage.depositAmount('1000');

  step('Performing withdrawal of 500');
  await accountPage.withdrawAmount('500');

  step('Navigating to Transactions tab');
  await accountPage.navigateToTransactions();

  const txnBeforeReset = await accountPage.getTransactionCount();
  step(`🧾 Transactions before reset: ${txnBeforeReset}`);
  assert.ok(txnBeforeReset > 0, 'There should be at least one transaction before reset');

  step('Clicking Reset button');
  await accountPage.clickResetButton();

  const txnAfterReset = await accountPage.getTransactionCount();
  step(`🗑️ Transactions after reset: ${txnAfterReset}`);
  assert.strictEqual(txnAfterReset, 0, 'All transactions should be cleared after reset');
});
