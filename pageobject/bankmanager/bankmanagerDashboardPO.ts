import { Page } from '@playwright/test';
import { BasePage } from '../basePO'; // Adjust path based on your structure

// Locators in camelCase
const addCustomerButton = 'button[ng-class="btnClass1"]';
const openAccountButton = 'button[ng-class="btnClass2"]';
const customersButton = 'button[ng-class="btnClass3"]';

/**
 * Page Object Model for Bank Manager Dashboard.
 * Encapsulates all interactions with the dashboard elements.
 */
export class BankManagerDashboardPage extends BasePage {
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
   * Clicks on "Add Customer" button.
   */
  async clickAddCustomer() {
    await this.click(addCustomerButton);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Clicks on "Open Account" button.
   */
  async clickOpenAccount() {
    await this.click(openAccountButton);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Clicks on "Customers" button.
   */
  async clickCustomers() {
    await this.click(customersButton);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Verifies if the "Add Customer" button is visible.
   * Includes a wait for the button to become visible.
   * @returns Promise<boolean>
   */
  async isAddCustomerButtonVisible(): Promise<boolean> {
    await this.waitForVisibility(addCustomerButton);
    return await this.isVisible(addCustomerButton);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Verifies if the "Open Account" button is visible.
   * @returns Promise<boolean>
   */
  async isOpenAccountButtonVisible(): Promise<boolean> {
    return await this.isVisible(openAccountButton);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Verifies if the "Customers" button is visible.
   * @returns Promise<boolean>
   */
  async isCustomersButtonVisible(): Promise<boolean> {
    return await this.isVisible(customersButton);
  }
}
