import { Page } from '@playwright/test';
import { BasePage } from '../BasePage'; // Adjust path based on your structure

// -----------------------------------------
// Locators for Bank Manager Dashboard Page
// -----------------------------------------
const ADD_CUSTOMER_BUTTON = 'button[ng-class="btnClass1"]';
const OPEN_ACCOUNT_BUTTON = 'button[ng-class="btnClass2"]';
const CUSTOMERS_BUTTON = 'button[ng-class="btnClass3"]';

/**
 * Page Object Model for Bank Manager Dashboard.
 * Encapsulates all interactions with the dashboard elements.
 */
export class BankManagerDashboardPage extends BasePage {
  /**
   * Constructor to initialize the base Page.
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Clicks on "Add Customer" button.
   */
  async clickAddCustomer() {
    await this.page.locator(ADD_CUSTOMER_BUTTON).click();
  }

  /**
   * Clicks on "Open Account" button.
   */
  async clickOpenAccount() {
    await this.page.locator(OPEN_ACCOUNT_BUTTON).click();
  }

  /**
   * Clicks on "Customers" button.
   */
  async clickCustomers() {
    await this.page.locator(CUSTOMERS_BUTTON).click();
  }

  /**
   * Verifies if the "Add Customer" button is visible.
   * Includes an optional wait to handle page rendering delays.
   * @returns boolean
   */
  async isAddCustomerButtonVisible() {
    await this.page.waitForTimeout(2000); // Optional: for visual rendering delay
    return await this.page.locator(ADD_CUSTOMER_BUTTON).isVisible();
  }

  /**
   * Verifies if the "Open Account" button is visible.
   * @returns boolean
   */
  async isOpenAccountButtonVisible() {
    return await this.page.locator(OPEN_ACCOUNT_BUTTON).isVisible();
  }

  /**
   * Verifies if the "Customers" button is visible.
   * @returns boolean
   */
  async isCustomersButtonVisible() {
    return await this.page.locator(CUSTOMERS_BUTTON).isVisible();
  }
}
