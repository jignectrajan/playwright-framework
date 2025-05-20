import { Page, Locator } from '@playwright/test';

export class CustomerLoginPage {
    private customerLoginBtn: Locator;
    private userDropdown: Locator;
    private loginBtn: Locator;

    constructor(private page: Page) {
        this.customerLoginBtn = page.locator('button[ng-click="customer()"]');
        this.userDropdown = page.locator('#userSelect');
        this.loginBtn = page.locator('button[type="submit"]');
    }

    async goToLoginPage() {
        await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');
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
}
