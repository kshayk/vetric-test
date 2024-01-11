export interface IValidator {
    validate(): void;
    getErrorMessage(): string | null;
}