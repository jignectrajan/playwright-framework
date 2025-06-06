import { Page } from '@playwright/test';
import { BasePage } from '../pageobject/basePO'; // adjust path if needed

// Locators in camelCase
const depositTab = 'text=Deposit';
const withdrawTab = '//button[@ng-click="withdrawl()"]';
const amountInput = 'input[ng-model="amount"]';
const submitButton = 'button[type="submit"]';
const messageText = '.error';
const transactionsTab = 'role=button[name="Transactions"]';
const transactionRows = 'table tbody tr';
const backButton = 'text=Back';
const balanceText = '//div[@class="center"]//text()[contains(., "Balance")]/following-sibling::strong[1]';
const currencyText = '//div[@class="center"]//text()[contains(., "Currency")]/following-sibling::strong[1]';
const resetButton = 'role=button[name="Reset"]';
const logoutButton = '//button[text()="Logout"]';

/**
 * Page Object Model for Account Page.
 * Handles deposit, withdrawal, transactions, balance, reset, and logout actions.
 */
export class AccountPage extends BasePage {
  /**
   * Thursday, June 05, 2025 12:34 PM
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    super(page);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Clicks the Logout button.
   */
  async clickOnLogOutButton() {
    await this.click(logoutButton);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Performs a deposit of the specified amount.
   * @param amount Amount to deposit
   */
  async depositAmount(amount: string) {
    await this.click(depositTab);
    await this.enterText(amountInput, amount);
    await this.click(submitButton);
    await this.page.waitForTimeout(2000);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Performs a withdrawal of the specified amount.
   * @param amount Amount to withdraw
   */
  async withdrawAmount(amount: string) {
    await this.page.waitForTimeout(2000);
    await this.click(withdrawTab);
    await this.page.waitForTimeout(2000);
    await this.enterText(amountInput, amount);
    await this.page.waitForTimeout(2000);
    await this.click(submitButton);
    await this.page.waitForTimeout(2000);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Returns the text of any message displayed on the page.
   * @returns Message text or null
   */
  async getMessageText(): Promise<string | null> {
    await this.page.waitForTimeout(5000);
    return this.page.locator(messageText).textContent();
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Returns the latest transaction details including amount and type.
   * @returns Object containing amount and type of the latest transaction
   */
  async getLatestTransaction(): Promise<{ amount: string; type: string }> {
    await this.click(transactionsTab);
    await this.page.waitForTimeout(1000);

    const latestRow = this.page.locator(transactionRows).last();
    const amount = (await latestRow.locator('td').nth(1).textContent())?.trim() ?? '';
    const type = (await latestRow.locator('td').nth(2).textContent())?.trim() ?? '';

    await this.click(backButton);
    await this.page.waitForTimeout(1000);

    return { amount, type };
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Returns the current balance displayed on the account page.
   * @returns Balance as a trimmed string
   */
  async getBalanceAmount(): Promise<string> {
    const balance = await this.page.locator(balanceText).textContent();
    return balance?.trim() ?? '';
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Navigates to the Transactions tab.
   */
  async navigateToTransactions() {
    await this.click(transactionsTab);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Returns all transactions with their amount and type.
   * @returns Array of transactions
   */
  async getTransactionRows() {
    await this.page.waitForTimeout(2000);
    const count = await this.page.locator(transactionRows).count();
    const transactions = [];

    for (let i = 0; i < count; i++) {
      const row = this.page.locator(transactionRows).nth(i);
      const amountText = await row.locator('td').nth(1).textContent();
      const typeText = await row.locator('td').nth(2).textContent();

      transactions.push({
        amount: Number(amountText),
        type: typeText?.trim() === 'Credit' ? 'Credit' : 'Debit',
      });
    }
    return transactions;
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Clicks the Reset button to clear transactions.
   */
  async clickResetButton() {
    await this.click(resetButton);
    await this.page.waitForTimeout(1000);
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Returns the count of transaction rows displayed.
   * @returns Number of transactions
   */
  async getTransactionCount(): Promise<number> {
    await this.page.waitForTimeout(5000);
    return this.page.locator(transactionRows).count();
  }

  /**
   * Thursday, June 05, 2025 12:34 PM
   * Returns the currency displayed on the account page.
   * @returns Currency as string
   */
  async getDisplayedCurrency(): Promise<string> {
    const currency = await this.page.locator(currencyText).textContent();
    return currency?.trim() ?? '';
  }
}
