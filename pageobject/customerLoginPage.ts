import { Page } from '@playwright/test';
import { BASE_URL } from '../constants';
import { BasePage } from '../pageobject/basePage';

const customerLoginButton = 'button[ng-click="customer()"]';
const userDropdown = '#userSelect';
const loginButton = 'button[type="submit"]';
const loggedInNameLabel = '.fontBig';
const homebutton = 'Home';
/**
 * Page Object Model for Customer Login Page.
 * Handles customer login workflow and verification.
 */
export class CustomerLoginPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigates to the base login/home page.
   */
  async goToLoginPage() {
    await this.navigateTo(BASE_URL);
  }

  /**
   * Performs complete login flow as specified customer.
   * @param userName - Name of the customer to login as
   */
  async loginAsCustomer(userName: string) {
    await this.clickCustomerLogin();
    await this.selectCustomer(userName);
    await this.clickLogin();
  }

  /**
   * Clicks the "Customer Login" button.
   */
  async clickCustomerLogin() {
    await this.page.locator(customerLoginButton).click();
  }

  /**
   * Selects a customer from the dropdown by visible label.
   * @param name - Customer name to select
   */
  async selectCustomer(name: string) {
    await this.page.locator(userDropdown).selectOption({ label: name });
  }

  /**
   * Clicks the login button to submit login form.
   */
  async clickLogin() {
    await this.page.locator(loginButton).click();
  }

  /**
   * Retrieves the logged-in user's name displayed on the page.
   * @returns Logged-in user name as string
   */
  async getLoggedInUserName(): Promise<string> {
    return await this.page.locator(loggedInNameLabel).innerText();
  }

  /**
   * Verifies if the logged-in user's name contains the expected name.
   * Throws an error if the verification fails.
   * @param expectedName - Expected logged-in user name
   */
  async verifyLoggedInUser(expectedName: string): Promise<void> {
    const actualName = await this.getLoggedInUserName();
    if (!actualName.includes(expectedName)) {
      throw new Error(`User should be logged in as ${expectedName}, but found ${actualName}`);
    }
    console.log(`User is correctly logged in as: ${expectedName}`);
  }

  async clickOnHomeButton() {
    await this.page.getByText(homebutton).click();
  }
}

