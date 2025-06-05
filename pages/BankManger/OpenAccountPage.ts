import { Page, Locator } from '@playwright/test';

// -----------------------------------------
// Locators for Open Account Page
// -----------------------------------------
const OPEN_ACCOUNT_TAB = 'button[ng-class="btnClass2"]';
const CUSTOMER_DROPDOWN = '#userSelect';
const CURRENCY_DROPDOWN = '#currency';
const PROCESS_BUTTON = 'button[type="submit"]';

/**
 * Page Object Model for Open Account Page.
 * Handles navigation and actions related to opening a new account.
 */
export class OpenAccountPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Clicks the "Open Account" tab to navigate to the open account section */
  async clickOpenAccountTab() {
    await this.page.locator(OPEN_ACCOUNT_TAB).click();
  }

  /** Selects a customer from the customer dropdown by visible label */
  async selectCustomer(name: string) {
    await this.page.locator(CUSTOMER_DROPDOWN).selectOption({ label: name });
  }

  /** Selects a currency from the currency dropdown by visible label */
  async selectCurrency(currency: string) {
    await this.page.locator(CURRENCY_DROPDOWN).selectOption({ label: currency });
  }

  /** Clicks the "Process" button to submit the form and waits briefly for processing */
  async clickProcessButton() {
    await this.page.locator(PROCESS_BUTTON).click();
    await this.page.waitForTimeout(3000);  // Adjust timeout if necessary
  }
}
