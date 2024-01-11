import {IValidator} from "./IValidator.js";

export class UserRequestValidator implements IValidator {
    private readonly requestData: string;
    private errorMessage: string | null = null;

    constructor(requestData: string) {
        this.requestData = requestData;
    }

    validate(): void {
        if (!this.requestData.includes('"gender":')) {
            this.errorMessage = 'Data does not contain the desired value';
        }
    }

    getErrorMessage(): string | null {
        return this.errorMessage;
    }
}