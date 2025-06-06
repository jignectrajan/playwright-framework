import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage'; // Adjust path to pagesobject folder if needed

// Locators in camelCase
const customersTab = 'button[ng-class="btnClass3"]';
const searchInput = 'input[ng-model="searchCustomer"]';
const customerRows = 'table tbody tr';

/**
 * Page Object Model for Customers Page.
 * Handles navigation, searching, and managing customers in the application.
 */
export class CustomersPage extends BasePage {
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
   * Clicks the "Customers" tab to navigate to the customers section.
   */
  async clickCustomersTab() {
    await this.click(customersTab);
  }

  /**

   *
   * Enters a customer name into the search input to filter customers.
   * @param name - Customer name to search for.
   */
  async searchCustomer(name: string) {
    await this.enterText(searchInput, name);
  }

  /**

   *
   * Returns a Locator for the first customer row in the customers table.
   * @returns Locator of the first customer row.
   */
 getFirstCustomerRow(): Locator {
    return this.page.locator(customerRows).first();
  }

  /**

   *
   * Checks if a customer with the given name is present in the customers table.
   * @param name - Customer name to check for.
   * @returns True if customer exists, false otherwise.
   */
  async isCustomerPresent(name: string): Promise<boolean> {
    const count = await this.page.locator(customerRows, { hasText: name }).count();
    return count > 0;
  }

  /**

   *
   * Returns a Locator for the customer row matching the given name.
   * @param name - Customer name to find.
   * @returns Locator for the matching customer row.
   */
  getCustomerRow(name: string): Locator {
    return this.page.locator(customerRows, { hasText: name });
  }

  /**

   *
   * Returns a Locator for the Delete button of a specific customer.
   * @param name - Customer name whose delete button is returned.
   * @returns Locator for the delete button.
   */
  getDeleteButtonForCustomer(name: string): Locator {
    return this.getCustomerRow(name).locator('button[ng-click="deleteCust(cust)"]');
  }

  /**

   *
   * Clicks the Delete button for the customer with the given name.
   * @param name - Customer name to delete.
   */
  async deleteCustomer(name: string) {
    await this.getDeleteButtonForCustomer(name).click();
  }

  /**

   *
   * Retrieves first name, last name, and post code of the first customer row.
   * @returns An object containing firstName, lastName, and postCode.
   */
  async getFirstCustomerRowDetails(): Promise<{ firstName: string; lastName: string; postCode: string }> {
    const row = this.getFirstCustomerRow();
    const cells = row.locator('td');
    return {
      firstName: await cells.nth(0).innerText(),
      lastName: await cells.nth(1).innerText(),
      postCode: await cells.nth(2).innerText(),
    };
  }

  /**

   *
   * Retrieves first name, last name, post code, and account number of the first customer row.
   * @returns An object containing firstName, lastName, postCode, and accountNumber.
   */
  async getFirstCustomerRowWithAccount(): Promise<{
    firstName: string;
    lastName: string;
    postCode: string;
    accountNumber: string;
  }> {
    const row = this.getFirstCustomerRow();
    const cells = row.locator('td');
    return {
      firstName: await cells.nth(0).innerText(),
      lastName: await cells.nth(1).innerText(),
      postCode: await cells.nth(2).innerText(),
      accountNumber: await cells.nth(3).innerText(),
    };
  }
}
