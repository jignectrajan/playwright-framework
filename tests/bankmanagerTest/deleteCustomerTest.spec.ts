import { test, expect } from '@playwright/test';
import { CustomersPage } from '../../pageobject/bankmanager/customersPage';
import { BankManagerLoginPage } from '../../pageobject/bankmanager/bankManagerLoginPage';
import { AddCustomerPage } from '../../pageobject/bankmanager/addNewCustomersPage';
import { createStepLogger } from '../../utilities/stepLogger';
import { CustomerData } from '../../dataFactory/customerData';
const customer = CustomerData.createCustomerData(); 
const step = createStepLogger();

test('Verify that customer is deleted and removed from the customer list', async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const customersPage = new CustomersPage(page);
    const loginPage = new BankManagerLoginPage(page);

    step('Navigating to login page and log in as Bank Manager');
    await loginPage.goToLoginPage();
    await loginPage.clickBankManagerLogin();

    step('Opening Add Customer tab');
    await addCustomerPage.clickAddCustomerTab();

    step(`Filling customer form with: ${customer.firstName} ${customer.lastName}, ${customer.postCode} and click on submit button`);
    await addCustomerPage.fillCustomerForm(customer.firstName, customer.lastName, customer.postCode);
    await addCustomerPage.submitCustomerForm();

    step('Opening Customers tab, Search customer and Verify the customer is present');
    await customersPage.clickCustomersTab();
    await customersPage.searchCustomer(customer.firstName);
    expect(await customersPage.isCustomerPresent(customer.firstName)).toBe(true);

    step('Deleting the customer, Search customer and Verify the customer is not present');
    await customersPage.deleteCustomer(customer.firstName);
    await customersPage.searchCustomer(customer.firstName);
    expect(await customersPage.isCustomerPresent(customer.firstName)).toBe(false);
});
