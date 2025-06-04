import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../../constants';

export class BankManagerLoginPage {
  private bankManagerLoginButton: Locator;

  constructor(private page: Page) {
    this.bankManagerLoginButton = this.page.locator('button[ng-click="manager()"]');
  }

  async goToLoginPage() {
    await this.page.goto(BASE_URL);
  }

  async clickBankManagerLogin() {
    await this.bankManagerLoginButton.click();
  }
}
