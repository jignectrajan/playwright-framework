// tests/fullCustomerOnboardingFlow.spec.ts
import { test, expect } from '@playwright/test';
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

  // Step 1: Go to login and login as Bank Manager
  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  // Step 2: Add Customer
  await addCustomerPage.clickAddCustomerTab();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
  await addCustomerPage.submitCustomerForm();

  // Step 3: Open Account
  await openAccountPage.clickOpenAccountTab();
  await openAccountPage.selectCustomer(fullName);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();

  // Step 4: Verify account number is added
  await customersPage.clickCustomersTab();
  await customersPage.searchCustomer(firstName);

  const customerRow = await customersPage.getFirstCustomerRow();

  await expect(customerRow.locator('td').nth(0)).toHaveText(firstName);
  await expect(customerRow.locator('td').nth(1)).toHaveText(lastName);
  await expect(customerRow.locator('td').nth(2)).toHaveText(postCode);
  await expect(customerRow.locator('td').nth(3)).not.toBeEmpty(); // Account number should not be empty
});
