import { Page, Locator } from '@playwright/test';

// -----------------------------------------
// Locators for Customers Page
// -----------------------------------------
const CUSTOMERS_TAB = 'button[ng-class="btnClass3"]';
const SEARCH_INPUT = 'input[ng-model="searchCustomer"]';
const CUSTOMER_ROWS = 'table tbody tr';

/**
 * Page Object Model for Customers Page.
 * Handles navigation, searching, and managing customers in the application.
 */
export class CustomersPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Clicks the "Customers" tab to navigate to the customers section */
  async clickCustomersTab() {
    await this.page.locator(CUSTOMERS_TAB).click();
  }

  /** Enters a customer name into the search input to filter customers */
  async searchCustomer(name: string) {
    await this.page.locator(SEARCH_INPUT).fill(name);
  }

  /** Returns a Locator for the first customer row in the customers table */
  getFirstCustomerRow(): Locator {
    return this.page.locator(CUSTOMER_ROWS).first();
  }

  /**
   * Checks if a customer with the given name is present in the customers table
   * @returns True if customer exists, false otherwise
   */
  async isCustomerPresent(name: string): Promise<boolean> {
    const count = await this.page.locator(CUSTOMER_ROWS, { hasText: name }).count();
    return count > 0;
  }

  /** Returns a Locator for the customer row matching the given name */
  getCustomerRow(name: string): Locator {
    return this.page.locator(CUSTOMER_ROWS, { hasText: name });
  }

  /** Returns a Locator for the Delete button of a specific customer */
  getDeleteButtonForCustomer(name: string): Locator {
    return this.getCustomerRow(name).locator('button[ng-click="deleteCust(cust)"]');
  }

  /** Clicks the Delete button for the customer with the given name */
  async deleteCustomer(name: string) {
    await this.getDeleteButtonForCustomer(name).click();
  }

  /** Retrieves first name, last name, and post code of the first customer row */
  async getFirstCustomerRowDetails(): Promise<{ firstName: string; lastName: string; postCode: string }> {
    const row = this.getFirstCustomerRow();
    const cells = row.locator('td');
    return {
      firstName: await cells.nth(0).innerText(),
      lastName: await cells.nth(1).innerText(),
      postCode: await cells.nth(2).innerText(),
    };
  }

  /** Retrieves first name, last name, post code, and account number of the first customer row */
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
