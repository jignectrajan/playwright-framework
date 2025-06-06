import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../pageobject/customerLoginPO';
import { AccountPage } from '../../pageobject/accountPO';
import { createStepLogger } from '../../utilities/stepLogger';
const step = createStepLogger();

test('Transaction history should display correct entries in correct order', async ({ page }) => {
  step('Navigating to banking app and logging in as Harry Potter');
  const customerLogin = new CustomerLoginPage(page);
  await customerLogin.goToLoginPage();
  await customerLogin.loginAsCustomer('Harry Potter');

  const account = new AccountPage(page);

  step('Performing transactions: ₹1000 deposit, ₹500 withdrawal, ₹500 deposit');
  await account.depositAmount('1000');
  await account.withdrawAmount('500');
  await account.depositAmount('500');

  step('Navigating to Transactions tab');
  await account.navigateToTransactions();

  step('Fetching transaction rows');
  const transactions = await account.getTransactionRows();

  const expected = [
    { amount: 1000, type: 'Credit' },
    { amount: 500, type: 'Debit' },
    { amount: 500, type: 'Credit' }
  ];

  step('Validating number of transactions');
  expect(transactions.length).toBe(expected.length);

  for (let i = 0; i < expected.length; i++) {
    expect(transactions[i].amount).toBe(expected[i].amount);
    expect(transactions[i].type).toBe(expected[i].type);
    console.log(`✅ Row ${i + 1}: ₹${transactions[i].amount} - ${transactions[i].type}`);
  }
});
