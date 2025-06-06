import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../pageobject/customerLoginPO';
import { AccountPage } from '../../pageobject/accountPO';
import * as assert from 'assert';
import { CUSTOMERHOMEPAGE_URL } from '../../constants';
import { createStepLogger } from '../../utilities/stepLogger';
const step = createStepLogger();

test('Verify thats logout redirects user to home page', async ({ page }) => {
    const accountPage = new AccountPage(page);
    const customerLoginPage = new CustomerLoginPage(page);

    step('Navigating to base URL and logging in as Harry Potter');
    await customerLoginPage.goToLoginPage();
    await customerLoginPage.loginAsCustomer('Harry Potter');

    step('Clicking on Logout button');
    await accountPage.clickOnLogOutButton();

    step('Verifying redirection to home page');
    const currentUrl = page.url();
    assert.strictEqual(currentUrl, CUSTOMERHOMEPAGE_URL, 'User should be redirected to home login page after logout');
});
