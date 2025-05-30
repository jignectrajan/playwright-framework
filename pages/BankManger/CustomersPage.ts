// pages/CustomersPage.ts
import { Page } from '@playwright/test';

export class CustomersPage {
  constructor(private page: Page) {}

  async clickCustomersTab() {
    await this.page.click('button[ng-class="btnClass3"]');
  }

  async searchCustomer(name: string) {
    await this.page.fill('input[ng-model="searchCustomer"]', name);
  }

  async getFirstCustomerRow() {
    return this.page.locator('table tbody tr').first();
  }
}
