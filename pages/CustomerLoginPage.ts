import { Page, Locator } from '@playwright/test';
import { BASE_URL } from '../constants';

export class CustomerLoginPage {
    private customerLoginBtn: Locator;
    private userDropdown: Locator;
    private loginBtn: Locator;
    private loggedInNameLabel: Locator;;

    constructor(private page: Page) {
        this.customerLoginBtn = page.locator('button[ng-click="customer()"]');
        this.userDropdown = page.locator('#userSelect');
        this.loginBtn = page.locator('button[type="submit"]');
        this.loggedInNameLabel = page.locator('.fontBig');
    }

    async goToLoginPage() {
        await this.page.goto(BASE_URL);
    }

    async loginAsCustomer(userName: string) {
        await this.clickCustomerLogin();
        await this.selectCustomer(userName);
        await this.clickLogin();
    }
    async clickCustomerLogin() {
        await this.customerLoginBtn.click();
    }

    async selectCustomer(name: string) {
        await this.userDropdown.selectOption({ label: name });
    }

    async clickLogin() {
        await this.loginBtn.click();
    }

    async getLoggedInUserName(): Promise<string> {
        return await this.loggedInNameLabel.innerText();
    }

    async verifyLoggedInUser(expectedName: string): Promise<void> {
        const actualName = await this.getLoggedInUserName();
        if (!actualName.includes(expectedName)) {
            throw new Error(`User should be logged in as ${expectedName}, but found ${actualName}`);
        }
        console.log(`User is correctly logged in as: ${expectedName}`);
    }
}
