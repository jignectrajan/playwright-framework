import { Page } from '@playwright/test';
import { BasePage } from '../basePO';

// Locators in camelCase
const addCustomerTab = "//button[contains(text(),'Add Customer')]";
const firstNameInput = 'input[ng-model="fName"]';
const lastNameInput = 'input[ng-model="lName"]';
const postCodeInput = 'input[ng-model="postCd"]';
const submitButton = 'button[type="submit"]';

export class AddCustomerPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Clicks the "Add Customer" tab.
   */
  async clickAddCustomerTab() {
    await this.click(addCustomerTab);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Fills the customer form with first name, last name, and post code.
   * @param firstName - Customer's first name.
   * @param lastName - Customer's last name.
   * @param postCode - Customer's postal code.
   */
  async fillCustomerForm(firstName: string, lastName: string, postCode: string) {
    await this.enterText(firstNameInput, firstName);
    await this.enterText(lastNameInput, lastName);
    await this.enterText(postCodeInput, postCode);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   *
   * Submits the customer form.
   */
  async submitCustomerForm() {
    await this.click(submitButton);
  }
}
