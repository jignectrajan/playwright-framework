// tests/data/customerFactory.ts

export interface CustomerData {
  firstName: string;
  lastName: string;
  postCode: string;
  currency: string;
}

export function createCustomerData(): CustomerData {
  return {
    firstName: 'John',
    lastName: 'Doe',
    postCode: '12345',
    currency: 'Dollar'
  };
}
