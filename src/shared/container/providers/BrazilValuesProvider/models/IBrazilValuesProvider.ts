export default interface IBrazilValuesProvider {
    validateCpf(payload: string): boolean;
    validateCep(payload: string): boolean;
}
