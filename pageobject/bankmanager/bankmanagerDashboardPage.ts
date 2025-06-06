import { Page } from '@playwright/test';
import { BasePage } from '../BasePage'; // Adjust path based on your structure

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
   *
   * Constructor to initialize the base Page.
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   *
   * Clicks on "Add Customer" button.
   */
  async clickAddCustomer() {
    await this.click(addCustomerButton);
  }

  /**
   *
   * Clicks on "Open Account" button.
   */
  async clickOpenAccount() {
    await this.click(openAccountButton);
  }

  /**
   *
   * Clicks on "Customers" button.
   */
  async clickCustomers() {
    await this.click(customersButton);
  }

  /**
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
   *
   * Verifies if the "Open Account" button is visible.
   * @returns Promise<boolean>
   */
  async isOpenAccountButtonVisible(): Promise<boolean> {
    return await this.isVisible(openAccountButton);
  }

  /**

   *
   * Verifies if the "Customers" button is visible.
   * @returns Promise<boolean>
   */
  async isCustomersButtonVisible(): Promise<boolean> {
    return await this.isVisible(customersButton);
  }
}
