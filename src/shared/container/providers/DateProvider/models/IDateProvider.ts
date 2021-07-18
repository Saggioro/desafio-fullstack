export default interface IDateProvider {
    validate(payload: Date): boolean;
    format(payload: Date): string;
    beforeToday(payload: Date): boolean;
}
