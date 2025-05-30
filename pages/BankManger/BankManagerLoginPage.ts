// pages/BankManagerLoginPage.ts
import { Page } from '@playwright/test';

export class BankManagerLoginPage {
  constructor(private page: Page) {}

  async goToLoginPage() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
  }

  async clickBankManagerLogin() {
    await this.page.click('button[ng-click="manager()"]');
  }
}
