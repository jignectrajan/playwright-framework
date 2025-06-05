// tests/addCustomerFlow.spec.ts
import { test } from '@playwright/test';
import { assert } from 'chai';
import { BankManagerLoginPage } from '../../pages/BankManger/BankManagerLoginPage';
import { AddCustomerPage } from '../../pages/BankManger/AddCustomerPage';
import { CustomersPage } from '../../pages/BankManger/CustomersPage';

test('Add customer and verify in customer list', async ({ page }) => {
  const loginPage = new BankManagerLoginPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersPage = new CustomersPage(page);

  const firstName = 'John';
  const lastName = 'Doe';
  const postCode = '12345';

  console.log('🔐 Step 1: Go to login page and log in as Bank Manager');
  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  console.log('➕ Step 2: Click Add Customer tab and fill customer details');
  await addCustomerPage.clickAddCustomerTab();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.submitCustomerForm();

  console.log('🔍 Step 3: Navigate to Customers tab and search for the customer');
  await customersPage.clickCustomersTab();
  await customersPage.searchCustomer(firstName);

  console.log('✅ Step 4: Validate customer information in the list');
  const { firstName: actualFirstName, lastName: actualLastName, postCode: actualPostCode } = await customersPage.getFirstCustomerRowDetails();

  assert.strictEqual(actualFirstName, firstName, 'First name should match');
  assert.strictEqual(actualLastName, lastName, 'Last name should match');
  assert.strictEqual(actualPostCode, postCode, 'Post code should match');
});
