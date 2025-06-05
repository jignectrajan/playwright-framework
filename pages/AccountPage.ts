import { Page } from '@playwright/test';

// -----------------------------------------
// Locators for Account Page
// -----------------------------------------
const DEPOSIT_TAB = 'text=Deposit';
const WITHDRAW_TAB = '//button[@ng-click="withdrawl()"]';
const AMOUNT_INPUT = 'input[ng-model="amount"]';
const SUBMIT_BUTTON = 'button[type="submit"]';
const MESSAGE_TEXT = '.error';
const TRANSACTIONS_TAB = 'role=button[name="Transactions"]';
const TRANSACTION_ROWS = 'table tbody tr';
const BACK_BUTTON = 'text=Back';
const BALANCE_TEXT = '//div[@class="center"]//text()[contains(., "Balance")]/following-sibling::strong[1]';
const CURRENCY_TEXT = '//div[@class="center"]//text()[contains(., "Currency")]/following-sibling::strong[1]';
const RESET_BUTTON = 'role=button[name="Reset"]';
const LOGOUT_BUTTON = '//button[text()="Logout"]';

/**
 * Page Object Model for Account Page.
 * Handles deposit, withdrawal, transactions, balance, reset, and logout actions.
 */
export class AccountPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** Clicks the Logout button */
  async clickOnLogOutButton() {
    await this.page.locator(LOGOUT_BUTTON).click();
    await this.page.waitForTimeout(1000);
  }

  /** Performs a deposit of the specified amount */
  async depositAmount(amount: string) {
    await this.page.locator(DEPOSIT_TAB).click();
    await this.page.locator(AMOUNT_INPUT).fill(amount);
    await this.page.locator(SUBMIT_BUTTON).click();
    await this.page.waitForTimeout(2000);
  }

  /** Performs a withdrawal of the specified amount */
  async withdrawAmount(amount: string) {
    await this.page.waitForTimeout(2000);
    await this.page.locator(WITHDRAW_TAB).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(AMOUNT_INPUT).fill(amount);
    await this.page.waitForTimeout(2000);
    await this.page.locator(SUBMIT_BUTTON).click();
    await this.page.waitForTimeout(2000);
  }

  /** Returns the text of any message displayed */
  async getMessageText(): Promise<string | null> {
    await this.page.waitForTimeout(5000);
    return this.page.locator(MESSAGE_TEXT).textContent();
  }

  /**
   * Returns the latest transaction details.
   * @returns Object with amount and type of transaction
   */
  async getLatestTransaction(): Promise<{ amount: string; type: string }> {
    await this.page.locator(TRANSACTIONS_TAB).click();
    await this.page.waitForTimeout(1000);

    const latestRow = this.page.locator(TRANSACTION_ROWS).last();
    const amount = (await latestRow.locator('td').nth(1).textContent())?.trim() ?? '';
    const type = (await latestRow.locator('td').nth(2).textContent())?.trim() ?? '';

    await this.page.locator(BACK_BUTTON).click();
    await this.page.waitForTimeout(1000);

    return { amount, type };
  }

  /** Returns the current balance as string */
  async getBalanceAmount(): Promise<string> {
    const balance = await this.page.locator(BALANCE_TEXT).textContent();
    return balance?.trim() ?? '';
  }

  /** Navigates to the Transactions tab */
  async navigateToTransactions() {
    await this.page.locator(TRANSACTIONS_TAB).click();
  }

  /**
   * Returns all transactions with their amount and type.
   * @returns Array of transactions
   */
  async getTransactionRows() {
    await this.page.waitForTimeout(2000);
    const count = await this.page.locator(TRANSACTION_ROWS).count();
    const transactions = [];

    for (let i = 0; i < count; i++) {
      const row = this.page.locator(TRANSACTION_ROWS).nth(i);
      const amountText = await row.locator('td').nth(1).textContent();
      const typeText = await row.locator('td').nth(2).textContent();

      transactions.push({
        amount: Number(amountText),
        type: typeText?.trim() === 'Credit' ? 'Credit' : 'Debit',
      });
    }
    return transactions;
  }

  /** Clicks the Reset button to clear transactions */
  async clickResetButton() {
    await this.page.locator(RESET_BUTTON).click();
    await this.page.waitForTimeout(1000);
  }

  /** Returns the count of transaction rows */
  async getTransactionCount(): Promise<number> {
    await this.page.waitForTimeout(5000);
    return this.page.locator(TRANSACTION_ROWS).count();
  }

  /** Returns the currency displayed */
  async getDisplayedCurrency(): Promise<string> {
    const currency = await this.page.locator(CURRENCY_TEXT).textContent();
    return currency?.trim() ?? '';
  }
}
