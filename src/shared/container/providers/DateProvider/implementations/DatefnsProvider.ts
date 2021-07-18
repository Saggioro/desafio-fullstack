import { isValid, formatISO, isBefore } from "date-fns";

import IDateProvider from "../models/IDateProvider";

class DatefnsProvider implements IDateProvider {
    public validate(payload: Date): boolean {
        return isValid(payload);
    }

    public format(payload: Date): string {
        return formatISO(payload, { representation: "date" });
    }

    public beforeToday(payload: Date): boolean {
        return isBefore(payload, new Date());
    }
}

export default DatefnsProvider;
