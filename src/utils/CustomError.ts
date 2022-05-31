export default class CustomError extends Error {
    ok: boolean;

    constructor(message: string, { ok }: { ok: boolean }) {
        super(message);
        this.ok = ok
    }
}
