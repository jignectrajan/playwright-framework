// imports
import { Page } from '@playwright/test';
import { BasePage } from '../BasePage';

// Locators
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
   * Clicks the "Add Customer" tab
   */
  async clickAddCustomerTab() {
    await this.page.click(addCustomerTab);
  }

  /**
   * Fills the customer form with first name, last name, and post code
   */
  async fillCustomerForm(firstName: string, lastName: string, postCode: string) {
    await this.page.fill(firstNameInput, firstName);
    await this.page.fill(lastNameInput, lastName);
    await this.page.fill(postCodeInput, postCode);
  }

  /**
   * Submits the form
   */
  async submitCustomerForm() {
    await this.page.click(submitButton);
  }
}
