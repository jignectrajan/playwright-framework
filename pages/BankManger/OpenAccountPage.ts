// pages/OpenAccountPage.ts
import { Page } from '@playwright/test';

export class OpenAccountPage {
  constructor(private page: Page) {}

  async clickOpenAccountTab() {
    await this.page.click('button[ng-class="btnClass2"]');
  }

  async selectCustomer(name: string) {
    await this.page.selectOption('#userSelect', { label: name });
  }

  async selectCurrency(currency: string) {
    await this.page.selectOption('#currency', { label: currency });
  }

  async clickProcessButton() {
    await this.page.click('button[type="submit"]');
    await this.page.waitForTimeout(3000); // slight wait before dialog
   // const alert = await this.page.waitForEvent('dialog');
   // await alert.accept();
  }
}
