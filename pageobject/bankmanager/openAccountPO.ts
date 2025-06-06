import { Page } from '@playwright/test';
import { BasePage } from '../basePO'; // Adjust path to pagesobject folder if needed

// Locators in camelCase
const openAccountTab = 'button[ng-class="btnClass2"]';
const customerDropdown = '#userSelect';
const currencyDropdown = '#currency';
const processButton = 'button[type="submit"]';

/**
 * Page Object Model for Open Account Page.
 * Handles navigation and actions related to opening a new account.
 */
export class OpenAccountPage extends BasePage {
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
   * Clicks the "Open Account" tab to navigate to the open account section.
   */
  async clickOpenAccountTab() {
    await this.click(openAccountTab);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Selects a customer from the customer dropdown by visible label.
   * @param name Customer name to select
   */
  async selectCustomer(name: string) {
    await this.selectOptionByLabel(customerDropdown, name);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Selects a currency from the currency dropdown by visible label.
   * @param currency Currency label to select
   */
  async selectCurrency(currency: string) {
    await this.selectOptionByLabel(currencyDropdown, currency);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Clicks the "Process" button to submit the form and waits briefly for processing.
   */
  async clickProcessButton() {
    await this.click(processButton);
    await this.page.waitForTimeout(3000); // Adjust timeout if necessary
  }
}
