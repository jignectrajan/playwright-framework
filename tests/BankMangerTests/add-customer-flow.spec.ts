import { test } from '@playwright/test';
import { assert } from 'chai';
import { AddCustomerPage } from '../../pages/BankManger/AddCustomerPage';
import { CustomersPage } from '../../pages/BankManger/CustomersPage';
import { BankManagerLoginPage } from '../../pages/BankManger/BankManagerLoginPage';
import { createStepLogger } from '../../utilities/stepLogger';
const step = createStepLogger();


test('Verify that customer is added in the customer list', async ({ page }) => {
  const loginPage = new BankManagerLoginPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersPage = new CustomersPage(page);

  const firstName = 'John';
  const lastName = 'Doe';
  const postCode = '12345';

// Add steps like this so it can ve dynamically update when the testcases are running
// let i: number = 1;
// step(`Step ${i}: User clicks on the Reward tab and selects the Partner menu`);

  step('Go to login page and log in as Bank Manager');
  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  step('➕Click Add Customer tab and fill customer details');
  await addCustomerPage.clickAddCustomerTab();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.submitCustomerForm();

  step('🔍Navigate to Customers tab and search for the customer');
  await customersPage.clickCustomersTab();
  await customersPage.searchCustomer(firstName);

  step('✅Validate customer information in the list');
  const { firstName: actualFirstName, lastName: actualLastName, postCode: actualPostCode } = await customersPage.getFirstCustomerRowDetails();

  assert.strictEqual(actualFirstName, firstName, 'First name should match');
  assert.strictEqual(actualLastName, lastName, 'Last name should match');
  assert.strictEqual(actualPostCode, postCode, 'Post code should match');
});
