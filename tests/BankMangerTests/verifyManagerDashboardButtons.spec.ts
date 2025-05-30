// tests/verifyManagerDashboardButtons.spec.ts
import { test, expect } from '@playwright/test';
import { BankManagerLoginPage } from '../../pages/BankManger/BankManagerLoginPage';
import { BankManagerDashboardPage } from '../../pages/BankManger/BankManagerDashboardPage';

test('Verify Bank Manager Dashboard Buttons', async ({ page }) => {
  const loginPage = new BankManagerLoginPage(page);
  const dashboardPage = new BankManagerDashboardPage(page);

  await loginPage.goToLoginPage();
  await loginPage.clickBankManagerLogin();

  const addCustomerBtn = await dashboardPage.getAddCustomerButton();
  const openAccountBtn = await dashboardPage.getOpenAccountButton();
  const customersBtn = await dashboardPage.getCustomersButton();

  await expect(addCustomerBtn).toBeVisible();
  await expect(openAccountBtn).toBeVisible();
  await expect(customersBtn).toBeVisible();
});
