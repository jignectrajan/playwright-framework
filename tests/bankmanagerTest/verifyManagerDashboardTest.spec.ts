import { test } from '@playwright/test';
import { assert } from 'chai';
import { BankManagerLoginPage } from '../../pageobject/bankmanager/bankManagerLoginPage';
import { BankManagerDashboardPage } from '../../pageobject/bankmanager/bankmanagerDashboardPage';
import { createStepLogger } from '../../utilities/stepLogger';
const step = createStepLogger();

test('Verify that Bank Manager dashboard buttons are visible', async ({ page }) => {
  const loginPage = new BankManagerLoginPage(page);
  const dashboardPage = new BankManagerDashboardPage(page);

  step('Navigate to login page and log in as Bank Manager');
  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  step('Assert all dashboard buttons are visible');
  assert.isTrue(await dashboardPage.isAddCustomerButtonVisible(), 'Add Customer button should be visible');
  assert.isTrue(await  dashboardPage.isOpenAccountButtonVisible(), 'Open Account button should be visible');
  assert.isTrue(await dashboardPage.isCustomersButtonVisible(), 'Customers button should be visible');
});
