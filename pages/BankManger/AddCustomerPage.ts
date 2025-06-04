import { Page, Locator } from '@playwright/test';

export class AddCustomerPage {
  private addCustomerTab: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postCodeInput: Locator;
  private submitButton: Locator;

  constructor(private page: Page) {
    this.addCustomerTab = this.page.locator('button[ng-class="btnClass1"]');
    this.firstNameInput = this.page.locator('input[ng-model="fName"]');
    this.lastNameInput = this.page.locator('input[ng-model="lName"]');
    this.postCodeInput = this.page.locator('input[ng-model="postCd"]');
    this.submitButton = this.page.locator('button[type="submit"]');
  }

  async clickAddCustomerTab() {
    await this.addCustomerTab.click();
  }

  async fillCustomerForm(firstName: string, lastName: string, postCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
  }

  async submitCustomerForm() {
    await this.submitButton.click();
    await this.page.waitForTimeout(3000);
  }
}
