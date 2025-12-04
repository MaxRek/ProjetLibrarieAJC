export class AuthRequestDto {
    constructor(private _email: string, private _password: string) { }

    public get email(): string {
        return this._email;
    }

    public set email(value: string) {
        this._email = value;
    }

    public get password(): string {
        return this._password;
    }

    public set password(value: string) {
        this._password = value;
    }

    public toJson(): any {
        return {
            email: this.email,
            password: this.password
        };
    }
}