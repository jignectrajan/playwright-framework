import { Page, Locator, expect } from '@playwright/test';

export class AccountPage {
    private depositTab: Locator;
    private withdrawTab: Locator;
    private amountInput: Locator;
    private submitBtn: Locator;
    private messageText: Locator;
    private transactionTab: Locator;
    private transactionRows: Locator;
    private backButton: Locator;

    constructor(private page: Page) {
        this.depositTab = page.getByText('Deposit');
        this.withdrawTab = page.locator('//button[@ng-click="withdrawl()"]');
        this.amountInput = page.locator('input[ng-model="amount"]');
        this.submitBtn = page.locator('button[type="submit"]');
        this.messageText = page.locator('.error');
        this.transactionTab = page.getByText('Transactions');
        this.transactionRows = page.locator('table tbody tr');
        this.backButton = page.getByText('Back'); // Back button locator
    }

    async depositAmount(amount: string) {
        await this.depositTab.click();
        await this.amountInput.fill(amount);
        await this.submitBtn.click();
        await this.page.waitForTimeout(2000); // Hard wait

    }

    async withdrawAmount(amount: string) {
        await this.withdrawTab.click();
        await this.amountInput.fill(amount);
        await this.submitBtn.click();
        await this.page.waitForTimeout(2000); // Hard wait

    }

    async getMessageText(): Promise<string | null> {
        return this.messageText.textContent();
    }

    async verifyTransaction(expectedAmount: string, expectedType: 'Credit' | 'Debit') {
        await this.transactionTab.click();
        await this.page.waitForTimeout(1000); // Wait for table to load

        // Get the LAST row (latest transaction)
        const latestRow = this.transactionRows.last();
        const amount = await latestRow.locator('td').nth(1).textContent();
        const type = await latestRow.locator('td').nth(2).textContent();

        expect(amount?.trim()).toBe(expectedAmount);
        expect(type?.trim()).toBe(expectedType);

        await this.backButton.click();
        await this.page.waitForTimeout(1000); // Ensure UI reloads
    }
}
