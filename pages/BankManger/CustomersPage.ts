import { Page, Locator } from '@playwright/test';

export class CustomersPage {
  private customersTab: Locator;
  private searchInput: Locator;
  private firstCustomerRow: Locator;

  constructor(private page: Page) {
    this.customersTab = this.page.locator('button[ng-class="btnClass3"]');
    this.searchInput = this.page.locator('input[ng-model="searchCustomer"]');
    this.firstCustomerRow = this.page.locator('table tbody tr').first();
  }

  async clickCustomersTab() {
    await this.customersTab.click();
  }

  async searchCustomer(name: string) {
    await this.searchInput.fill(name);
  }

  async getFirstCustomerRow() {
    return this.firstCustomerRow;
  }

  async isCustomerPresent(name: string): Promise<boolean> {
    const matchingRowsCount = await this.page.locator('table tbody tr', { hasText: name }).count();
    return matchingRowsCount > 0;
  }

  getCustomerRow(name: string): Locator {
    return this.page.locator('table tbody tr', { hasText: name });
  }
  getDeleteButtonForCustomer(name: string): Locator {
    return this.getCustomerRow(name).locator('button[ng-click="deleteCust(cust)"]');
  }

  async deleteCustomer(name: string) {
    const deleteBtn = this.getDeleteButtonForCustomer(name);
    await deleteBtn.click();
  }

  async getFirstCustomerRowDetails(): Promise<{ firstName: string; lastName: string; postCode: string }> {
    const customerRow = await this.getFirstCustomerRow();
    const cells = customerRow.locator('td');

    const firstName = await cells.nth(0).innerText();
    const lastName = await cells.nth(1).innerText();
    const postCode = await cells.nth(2).innerText();

    return { firstName, lastName, postCode };
  }

  async getFirstCustomerRowWithAccount(): Promise<{
    firstName: string;
    lastName: string;
    postCode: string;
    accountNumber: string;
  }> {
    const customerRow = await this.getFirstCustomerRow();
    const cells = customerRow.locator('td');

    const firstName = await cells.nth(0).innerText();
    const lastName = await cells.nth(1).innerText();
    const postCode = await cells.nth(2).innerText();
    const accountNumber = await cells.nth(3).innerText();

    return { firstName, lastName, postCode, accountNumber };
  }

}
