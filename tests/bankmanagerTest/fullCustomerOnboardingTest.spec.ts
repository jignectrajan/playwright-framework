import { test } from '@playwright/test';
import { assert } from 'chai';
import { CustomersPage } from '../../pageobject/bankmanager/customersPage';
import { BankManagerLoginPage } from '../../pageobject/bankmanager/bankManagerLoginPage';
import { AddCustomerPage } from '../../pageobject/bankmanager/addNewCustomersPage';
import { OpenAccountPage } from '../../pageobject/bankmanager/openAccountPage';
import { createStepLogger } from '../../utilities/stepLogger';
import { CustomerData } from '../../dataFactory/customerData';
const customer = CustomerData.createCustomerData(); 
const step = createStepLogger();

test('Verify that customer is added, account is opened, and account number is displayed', async ({ page }) => {
  const loginPage = new BankManagerLoginPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersPage = new CustomersPage(page);

  const fullName = `${customer.firstName} ${customer.lastName}`;

  step('Navigate to login page and log in as Bank Manager');
  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  step('Add a new customer');
  await addCustomerPage.clickAddCustomerTab();
  await addCustomerPage.fillCustomerForm(customer.firstName, customer.lastName, customer.postCode);
  await addCustomerPage.submitCustomerForm();

  step('Open a bank account for the new customer');
  await openAccountPage.clickOpenAccountTab();
  await openAccountPage.selectCustomer(fullName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();

  step('Search for customer and verify account details');
  await customersPage.clickCustomersTab();
  await customersPage.searchCustomer(customer.firstName);

  step('Assert all customer details including account number');
  const { firstName: actualFirstName, lastName: actualLastName, postCode: actualPostCode, accountNumber: actualAccountNumber } = await customersPage.getFirstCustomerRowWithAccount();

  assert.equal(actualFirstName, customer.firstName, 'First name should match');
  assert.equal(actualLastName, customer.lastName, 'Last name should match');
  assert.equal(actualPostCode, customer.postCode, 'Post code should match');
  assert.isNotEmpty(actualAccountNumber, 'Account number should not be empty');
});
