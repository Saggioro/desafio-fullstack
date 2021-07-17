export interface IMessages {
    field: string;
    message: string;
}

class Error {
    public readonly messages: IMessages[];

    public readonly statusCode: number;

    constructor(messages: IMessages[], statusCode = 400) {
        this.messages = messages;
        this.statusCode = statusCode;
    }
}

export default Error;
