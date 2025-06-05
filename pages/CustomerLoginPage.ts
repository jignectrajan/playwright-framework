import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../constants';

// -----------------------------------------
// Locators for Customer Login Page
// -----------------------------------------
const CUSTOMER_LOGIN_BUTTON = 'button[ng-click="customer()"]';
const USER_DROPDOWN = '#userSelect';
const LOGIN_BUTTON = 'button[type="submit"]';
const LOGGED_IN_NAME_LABEL = '.fontBig';

/**
 * Page Object Model for Customer Login Page.
 * Handles customer login workflow and verification.
 */
export class CustomerLoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigate to the base login/home page */
  async goToLoginPage() {
    await this.page.goto(BASE_URL);
  }

  /** Performs complete login flow as specified customer */
  async loginAsCustomer(userName: string) {
    await this.clickCustomerLogin();
    await this.selectCustomer(userName);
    await this.clickLogin();
  }

  /** Clicks the "Customer Login" button */
  async clickCustomerLogin() {
    await this.page.locator(CUSTOMER_LOGIN_BUTTON).click();
  }

  /** Selects a customer from the dropdown by visible label */
  async selectCustomer(name: string) {
    await this.page.locator(USER_DROPDOWN).selectOption({ label: name });
  }

  /** Clicks the login button to submit login form */
  async clickLogin() {
    await this.page.locator(LOGIN_BUTTON).click();
  }

  /** Retrieves the logged-in user's name displayed on the page */
  async getLoggedInUserName(): Promise<string> {
    return await this.page.locator(LOGGED_IN_NAME_LABEL).innerText();
  }

  /**
   * Verifies if the logged-in user's name contains the expected name.
   * Throws an error if the verification fails.
   */
  async verifyLoggedInUser(expectedName: string): Promise<void> {
    const actualName = await this.getLoggedInUserName();
    if (!actualName.includes(expectedName)) {
      throw new Error(`User should be logged in as ${expectedName}, but found ${actualName}`);
    }
    console.log(`User is correctly logged in as: ${expectedName}`);
  }
}
