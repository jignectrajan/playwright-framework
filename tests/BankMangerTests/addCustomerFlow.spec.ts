// tests/addCustomerFlow.spec.ts
import { test, expect } from '@playwright/test';
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

  // Step 1: Go to login and login as Bank Manager
  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  // Step 2: Add Customer
  await addCustomerPage.clickAddCustomerTab();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.submitCustomerForm();

  // Step 3: Navigate to Customers tab
  await customersPage.clickCustomersTab();
  await customersPage.searchCustomer(firstName);

  // Step 4: Validate customer data
  const customerRow = await customersPage.getFirstCustomerRow();
  await expect(customerRow.locator('td').nth(0)).toHaveText(firstName);
  await expect(customerRow.locator('td').nth(1)).toHaveText(lastName);
  await expect(customerRow.locator('td').nth(2)).toHaveText(postCode);
});
