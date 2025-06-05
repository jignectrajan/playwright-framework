// tests/fullCustomerOnboardingFlow.spec.ts
import { test } from '@playwright/test';
import { assert } from 'chai';
import { BankManagerLoginPage } from '../../pages/BankManger/BankManagerLoginPage';
import { AddCustomerPage } from '../../pages/BankManger/AddCustomerPage';
import { OpenAccountPage } from '../../pages/BankManger/OpenAccountPage';
import { CustomersPage } from '../../pages/BankManger/CustomersPage';

test('Add customer, open account, and verify account number', async ({ page }) => {
  const loginPage = new BankManagerLoginPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersPage = new CustomersPage(page);

  const firstName = 'Jane';
  const lastName = 'Doe';
  const postCode = '54321';
  const fullName = `${firstName} ${lastName}`;

  console.log('🔐 Step 1: Navigate to login page and log in as Bank Manager');
  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  console.log('➕ Step 2: Add a new customer');
  await addCustomerPage.clickAddCustomerTab();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.submitCustomerForm();

  console.log('💼 Step 3: Open a bank account for the new customer');
  await openAccountPage.clickOpenAccountTab();
  await openAccountPage.selectCustomer(fullName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();

  console.log('🔍 Step 4: Search for customer and verify account details');
  await customersPage.clickCustomersTab();
  await customersPage.searchCustomer(firstName);

  console.log('✅ Step 5: Assert all customer details including account number');
  const { firstName: actualFirstName, lastName: actualLastName, postCode: actualPostCode, accountNumber: actualAccountNumber } = await customersPage.getFirstCustomerRowWithAccount();

  assert.equal(actualFirstName, firstName, 'First name should match');
  assert.equal(actualLastName, lastName, 'Last name should match');
  assert.equal(actualPostCode, postCode, 'Post code should match');
  assert.isNotEmpty(actualAccountNumber, 'Account number should not be empty');
});
