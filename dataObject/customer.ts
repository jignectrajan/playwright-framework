export class customer {
    public firstName: string;
    public lastName: string;
    public postCode: string;
    public currency: string;

    constructor({ firstName, lastname, postCode, currency }: { firstName: string; lastname: string, postCode: string, currency: string }) {
        this.firstName = firstName;
        this.lastName = lastname;
        this.postCode = postCode;
        this.currency = currency;
    }
}
