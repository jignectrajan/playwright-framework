import { Page, Locator } from '@playwright/test';

export class OpenAccountPage {
  private openAccountTab: Locator;
  private customerDropdown: Locator;
  private currencyDropdown: Locator;
  private processButton: Locator;

  constructor(private page: Page) {
    this.openAccountTab = this.page.locator('button[ng-class="btnClass2"]');
    this.customerDropdown = this.page.locator('#userSelect');
    this.currencyDropdown = this.page.locator('#currency');
    this.processButton = this.page.locator('button[type="submit"]');
  }

  async clickOpenAccountTab() {
    await this.openAccountTab.click();
  }

  async selectCustomer(name: string) {
    await this.customerDropdown.selectOption({ label: name });
  }

  async selectCurrency(currency: string) {
    await this.currencyDropdown.selectOption({ label: currency });
  }

  async clickProcessButton() {
    await this.processButton.click();
    await this.page.waitForTimeout(3000);
  }
}
