import { test, expect } from '@playwright/test';
import { CustomersPage } from '../../pages/BankManger/CustomersPage';
import { BankManagerLoginPage } from '../../pages/BankManger/BankManagerLoginPage';
import { AddCustomerPage } from '../../pages/BankManger/AddCustomerPage';
import { createStepLogger } from '../../utilities/stepLogger';
const step = createStepLogger();

test('Verify that customer is deleted and removed from the customer list', async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const customersPage = new CustomersPage(page);
    const loginPage = new BankManagerLoginPage(page);
    const firstName = 'TestFirst';
    const lastName = 'TestLast';
    const postCode = '12345';

    step('Navigating to login page and log in as Bank Manager');
    await loginPage.goToLoginPage();
    await loginPage.clickBankManagerLogin();

    step('Opening Add Customer tab');
    await addCustomerPage.clickAddCustomerTab();

    step(`Filling customer form with: ${firstName} ${lastName}, ${postCode} and click on submit button`);
    await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
    await addCustomerPage.submitCustomerForm();

    step('Opening Customers tab, Search customer and Verify the customer is present');
    await customersPage.clickCustomersTab();
    await customersPage.searchCustomer(firstName);
    expect(await customersPage.isCustomerPresent(firstName)).toBe(true);

    step('Deleting the customer, Search customer and Verify the customer is not present');
    await customersPage.deleteCustomer(firstName);
    await customersPage.searchCustomer(firstName);
    expect(await customersPage.isCustomerPresent(firstName)).toBe(false);
});
