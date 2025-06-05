import { Page, Locator, expect } from '@playwright/test';

export class AddCustomerPage {
  private addCustomerTab: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postCodeInput: Locator;
  private submitButton: Locator;

  constructor(private page: Page) {
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' }); // ✅ More robust selector
    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postCodeInput = page.locator('input[ng-model="postCd"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  // ✅ Added log for debugging and readability
  async clickAddCustomerTab() {
    await this.addCustomerTab.click();
  }

  async fillCustomerForm(firstName: string, lastName: string, postCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
  }

  async submitCustomerForm() {
    await Promise.all([
      this.submitButton.click()
    ]);
  }
}
