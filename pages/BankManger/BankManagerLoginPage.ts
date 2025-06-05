import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../../constants'; // Base URL constant for the application

// -----------------------------------------
// Locators for Bank Manager Login Page
// -----------------------------------------
const BANK_MANAGER_LOGIN_BUTTON = 'button[ng-click="manager()"]';

/**
 * Page Object Model for Bank Manager Login Page.
 * Handles navigation and login actions for the bank manager.
 */
export class BankManagerLoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigates to the login/home page using the base URL */
  async goToLoginPage() {
    await this.page.goto(BASE_URL);
  }

  /** Clicks the "Bank Manager Login" button on the home page */
  async clickBankManagerLogin() {
    await this.page.locator(BANK_MANAGER_LOGIN_BUTTON).click();
  }
}
