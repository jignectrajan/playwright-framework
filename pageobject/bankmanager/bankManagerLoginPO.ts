import { Page } from '@playwright/test';
import { BasePage } from '../basePO'; // Adjusted path assuming 'pagesobject' folder
import { BASE_URL } from '../../constants'; // Base URL constant for the application

// Locator in camelCase
const bankManagerLoginButton = 'button[ng-click="manager()"]';

/**
 * Page Object Model for Bank Manager Login Page.
 * Handles navigation and login actions for the bank manager.
 */
export class BankManagerLoginPage extends BasePage {
  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Constructor to initialize the base Page.
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Navigates to the login/home page using the base URL.
   */
  async goToLoginPage() {
    await this.navigateTo(BASE_URL);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Clicks the "Bank Manager Login" button on the home page.
   */
  async clickBankManagerLogin() {
    await this.click(bankManagerLoginButton);
  }
}
