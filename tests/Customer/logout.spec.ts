import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../pages/CustomerLoginPage';
import { AccountPage } from '../../pages/AccountPage';
import * as assert from 'assert';
import { BASE_URL, CUSTOMERHOMEPAGR_URL } from '../../constants';
import { createStepLogger } from '../../utilities/stepLogger'; // adjust path as needed
const step = createStepLogger();

test('Verify thats logout redirects user to home page', async ({ page }) => {
    
    step('Navigating to base URL and logging in as Harry Potter');
    await page.goto(BASE_URL);
    const customerLoginPage = new CustomerLoginPage(page);
    await customerLoginPage.loginAsCustomer('Harry Potter');

    step('Clicking on Logout button');
    const accountPage = new AccountPage(page);
    await accountPage.clickOnLogOutButton();

    step('Verifying redirection to home page');
    const currentUrl = page.url();
    assert.strictEqual(currentUrl, CUSTOMERHOMEPAGR_URL, 'User should be redirected to home login page after logout');
});
