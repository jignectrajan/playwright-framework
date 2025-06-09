import { test } from '@playwright/test';
import { assert } from 'chai';
import { AddCustomerPage } from '../../pageobject/bankmanager/addNewCustomersPage';
import { CustomersPage } from '../../pageobject/bankmanager/customersPage';
import { BankManagerLoginPage } from '../../pageobject/bankmanager/bankManagerLoginPage';
import { createStepLogger } from '../../utilities/stepLogger';
import { CustomerData } from '../../dataFactory/customerData';
const customer = CustomerData.createCustomerData();
const step = createStepLogger();

test('Verify that customer is added in the customer list', async ({ page }) => {
  const loginPage = new BankManagerLoginPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersPage = new CustomersPage(page);

  step('Go to login page and log in as Bank Manager');
  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  step('Click Add Customer tab and fill customer details');
  await addCustomerPage.clickAddCustomerTab();
  await addCustomerPage.fillCustomerForm(customer.firstName, customer.lastName, customer.postCode);
  await addCustomerPage.submitCustomerForm();

  step('Navigate to Customers tab and search for the customer');
  await customersPage.clickCustomersTab();
  await customersPage.searchCustomer(customer.firstName);

  step('Validate customer information in the list');
  const { firstName: actualFirstName, lastName: actualLastName, postCode: actualPostCode } = await customersPage.getFirstCustomerRowDetails();

  assert.strictEqual(actualFirstName, customer.firstName, 'First name should match');
  assert.strictEqual(actualLastName, customer.lastName, 'Last name should match');
  assert.strictEqual(actualPostCode, customer.postCode, 'Post code should match');
});
