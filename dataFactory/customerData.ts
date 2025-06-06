import { customer } from "../dataObject/customer";

export class CustomerData {
  /**
   * Creates and returns a login object with valid login details.
   *
   * @returns {Login} The login object with valid login details.
   */
  static createCustomerData(): customer {
    return new customer({
      firstName: 'John',
      lastname: 'Doe',
      postCode: '12345',
      currency: 'Dollar'
    });
  }
}