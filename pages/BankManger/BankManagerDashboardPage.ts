// pages/BankManagerDashboardPage.ts
import { Page } from '@playwright/test';

export class BankManagerDashboardPage {
  constructor(private page: Page) {}

  async getAddCustomerButton() {
    return this.page.locator('button[ng-class="btnClass1"]');
  }

  async getOpenAccountButton() {
    return this.page.locator('button[ng-class="btnClass2"]');
  }

  async getCustomersButton() {
    return this.page.locator('button[ng-class="btnClass3"]');
  }
}
