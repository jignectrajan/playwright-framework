// tests/verifyManagerDashboardButtons.spec.ts
import { test } from '@playwright/test';
import { assert } from 'chai';
import { BankManagerLoginPage } from '../../pages/BankManger/BankManagerLoginPage';
import { BankManagerDashboardPage } from '../../pages/BankManger/BankManagerDashboardPage';

test('Verify Bank Manager Dashboard Buttons', async ({ page }) => {
  const loginPage = new BankManagerLoginPage(page);
  const dashboardPage = new BankManagerDashboardPage(page);

  console.log('🔐 Step 1: Navigate to login page and log in as Bank Manager');
  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  console.log('✅ Step 3: Assert all dashboard buttons are visible');
  assert.isTrue(await dashboardPage.isAddCustomerButtonVisible(), 'Add Customer button should be visible');
  assert.isTrue(await  dashboardPage.isOpenAccountButtonVisible(), 'Open Account button should be visible');
  assert.isTrue(await dashboardPage.isCustomersButtonVisible(), 'Customers button should be visible');
});
