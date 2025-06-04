import { Page, Locator } from '@playwright/test';

export class BankManagerDashboardPage {
  private addCustomerButton: Locator;
  private openAccountButton: Locator;
  private customersButton: Locator;

  constructor(private page: Page) {
    this.addCustomerButton = this.page.locator('button[ng-class="btnClass1"]');
    this.openAccountButton = this.page.locator('button[ng-class="btnClass2"]');
    this.customersButton = this.page.locator('button[ng-class="btnClass3"]');
  }

  async clickAddCustomer() {
    await this.addCustomerButton.click();
  }

  async clickOpenAccount() {
    await this.openAccountButton.click();
  }

  async clickCustomers() {
    await this.customersButton.click();
  }

  async isAddCustomerButtonVisible() {
    await this.page.waitForTimeout(2000);
    return await this.addCustomerButton.isVisible();
  }

  async isOpenAccountButtonVisible() {
    return await this.openAccountButton.isVisible();
  }

  async isCustomersButtonVisible() {
    return await this.customersButton.isVisible();
  }
}
