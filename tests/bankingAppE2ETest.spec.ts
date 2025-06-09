import { test } from '@playwright/test';
import { assert } from 'chai';
import { BankManagerLoginPage } from '../pageobject/bankmanager/bankManagerLoginPage';
import { BankManagerDashboardPage } from '../pageobject/bankmanager/bankmanagerDashboardPage';
import { AddCustomerPage } from '../pageobject/bankmanager/addNewCustomersPage';
import { OpenAccountPage } from '../pageobject/bankmanager/openAccountPage';
import { CustomersPage } from '../pageobject/bankmanager/customersPage';
import { CustomerLoginPage } from '../pageobject/customerLoginPage';
import { AccountPage } from '../pageobject/accountPage';
import { createStepLogger } from '../utilities/stepLogger';
import { CustomerData } from '../dataFactory/customerData';
const customer = CustomerData.createCustomerData();
const step = createStepLogger();

test('Banking App E2E Flow', async ({ page }) => {
  const bankManagerLogin = new BankManagerLoginPage(page);
  const dashboard = new BankManagerDashboardPage(page);
  const addCustomer = new AddCustomerPage(page);
  const openAccount = new OpenAccountPage(page);
  const customers = new CustomersPage(page);
  const customerLogin = new CustomerLoginPage(page);
  const accountPage = new AccountPage(page);

  step('Bank Manager Login and Add Customer');
  await bankManagerLogin.goToLoginPage();
  await bankManagerLogin.clickBankManagerLogin();
  await dashboard.clickAddCustomer();
  await addCustomer.fillCustomerForm(customer.firstName, customer.lastName, customer.postCode);
  await addCustomer.submitCustomerForm();

  step('Open Account for the new customer');
  await dashboard.clickOpenAccount();
  await openAccount.selectCustomer(customer.firstName + ' ' + customer.lastName);
  await openAccount.selectCurrency(customer.currency);
  await openAccount.clickProcessButton();

  step('Validate customer in list');
  await dashboard.clickCustomers();
  await customers.searchCustomer(customer.firstName);
  const customerRow = customers.getFirstCustomerRow();
  const rowText = await customerRow.innerText();
  assert.include(rowText, customer.firstName, 'Customer should appear in the list');

  step('Login as Customer');
  await customerLogin.clickOnHomeButton();
  await customerLogin.clickCustomerLogin();
  await customerLogin.selectCustomer(customer.firstName + ' ' + customer.lastName);
  await customerLogin.clickLogin();
  const displayedCurrency = await accountPage.getDisplayedCurrency();
  assert.strictEqual(displayedCurrency, customer.currency, 'Displayed currency should match the selected currency');

  step('Deposit amount');
  await accountPage.depositAmount('5000');
  const depositMsg = await accountPage.getMessageText();
  assert.strictEqual(depositMsg?.trim(), 'Deposit Successful', 'Deposit message should match');

  const latestDeposit = await accountPage.getLatestTransaction();
  assert.strictEqual(latestDeposit.amount, '5000', 'Deposit amount should be 5000');
  assert.strictEqual(latestDeposit.type, 'Credit', 'Transaction type should be Credit');

  step('Withdraw amount');
  await accountPage.withdrawAmount('2000');
  const withdrawMsg = await accountPage.getMessageText();
  assert.strictEqual(withdrawMsg?.trim(), 'Transaction successful', 'Withdraw message should match');

  const latestWithdraw = await accountPage.getLatestTransaction();
  assert.strictEqual(latestWithdraw.amount, '2000', 'Withdraw amount should be 2000');
  assert.strictEqual(latestWithdraw.type, 'Debit', 'Transaction type should be Debit');

  step('Verify transaction history balance');
  const balance = await accountPage.getBalanceAmount();
  const expectedBalance = (5000 - 2000).toString();
  assert.strictEqual(balance, expectedBalance, `Balance should be ${expectedBalance}`);

  step('Logout and verify redirection to customer page');
  await accountPage.clickOnLogOutButton();
  const currentUrl = page.url();
  assert.include(currentUrl, '/customer', 'Should redirect to customer page after logout');
});
