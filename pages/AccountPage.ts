import { Page, Locator } from '@playwright/test';

export class AccountPage {
    private depositTab: Locator;
    private withdrawTab: Locator;
    private amountInput: Locator;
    private submitBtn: Locator;
    private messageText: Locator;
    private transactionTab: Locator;
    private transactionRows: Locator;
    private backButton: Locator;
    private balanceText: Locator;
    private resetButton: Locator;
    private logoutButton: Locator;
    private currencyText: Locator;

    constructor(private page: Page) {
        this.depositTab = this.page.getByText('Deposit');
        this.withdrawTab = this.page.locator('//button[@ng-click="withdrawl()"]');
        this.amountInput = this.page.locator('input[ng-model="amount"]');
        this.submitBtn = this.page.locator('button[type="submit"]');
        this.messageText = this.page.locator('.error');
        this.transactionTab = this.page.getByRole('button', { name: 'Transactions' });
        this.transactionRows = this.page.locator('table tbody tr');
        this.backButton = this.page.getByText('Back');
        this.balanceText = this.page.locator('//div[@class="center"]//text()[contains(., "Balance")]/following-sibling::strong[1]');
        this.currencyText = this.page.locator('//div[@class="center"]//text()[contains(., "Currency")]/following-sibling::strong[1]');
        this.resetButton = this.page.getByRole('button', { name: 'Reset' });
        this.logoutButton = this.page.getByText('Logout');
    }

    async clickOnLogOutButton() {
        await this.logoutButton.click();
        await this.page.waitForTimeout(1000);
    }

    async depositAmount(amount: string) {
        await this.depositTab.click();
        await this.amountInput.fill(amount);
        await this.submitBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async withdrawAmount(amount: string) {
        await this.page.waitForTimeout(2000);
        await this.withdrawTab.click();
        await this.page.waitForTimeout(2000);
        await this.amountInput.fill(amount);
        await this.page.waitForTimeout(2000);
        await this.submitBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async getMessageText(): Promise<string | null> {
        await this.page.waitForTimeout(5000);
        return this.messageText.textContent();
    }

    async getLatestTransaction(): Promise<{ amount: string; type: string }> {
        await this.transactionTab.click();
        await this.page.waitForTimeout(1000);

        const latestRow = this.transactionRows.last();
        const amount = (await latestRow.locator('td').nth(1).textContent())?.trim() || '';
        const type = (await latestRow.locator('td').nth(2).textContent())?.trim() || '';

        await this.backButton.click();
        await this.page.waitForTimeout(1000);

        return { amount, type };
    }

    async getBalanceAmount(): Promise<string> {
        const balance = await this.balanceText.textContent();
        return balance?.trim() || '';
    }

    async navigateToTransactions() {
        await this.transactionTab.click();
    }

    async getTransactionRows() {
        await this.page.waitForTimeout(2000);
        const count = await this.transactionRows.count();
        const transactions = [];

        for (let i = 0; i < count; i++) {
            const row = this.transactionRows.nth(i);
            const amount = await row.locator('td').nth(1).textContent();
            const type = await row.locator('td').nth(2).textContent();
            transactions.push({
                amount: Number(amount),
                type: type?.trim() === 'Credit' ? 'Credit' : 'Debit',
            });
        }

        return transactions;
    }

    async clickResetButton() {
        await this.resetButton.click();
        await this.page.waitForTimeout(1000);
    }

    async getTransactionCount(): Promise<number> {
        await this.page.waitForTimeout(5000);
        return await this.transactionRows.count();
    }

    async getDisplayedCurrency(): Promise<string> {
        const currencyText = await this.currencyText.textContent();
        return currencyText?.trim() || '';
    }
}
