// pages/AddCustomerPage.ts
import { Page } from '@playwright/test';

export class AddCustomerPage {
  constructor(private page: Page) {}

  async clickAddCustomerTab() {
    await this.page.click('button[ng-class="btnClass1"]');
  }

  async fillCustomerForm(firstName: string, lastName: string, postCode: string) {
    await this.page.fill('input[ng-model="fName"]', firstName);
    await this.page.fill('input[ng-model="lName"]', lastName);
    await this.page.fill('input[ng-model="postCd"]', postCode);
  }

  async submitCustomerForm() {
    await this.page.click('button[type="submit"]');
    await this.page.waitForTimeout(3000);
    // const alert = await this.page.waitForEvent('dialog');
    // await alert.accept();
  }
}
