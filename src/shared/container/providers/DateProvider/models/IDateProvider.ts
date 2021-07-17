export default interface IHashProvider {
    validate(payload: Date): boolean;
    format(payload: Date): string;
    beforeToday(payload: Date): boolean;
}
