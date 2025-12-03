export class CompteDto {
    constructor(
        private _id: number,
        private _nom: string,
        private _prenom: string,
        private _email: string,
        private _password: string
    ) { }

    public get id(): number {
        return this._id;
    }

    public get nom(): string {
        return this._nom;
    }
    public get prenom(): string {
        return this._prenom;
    }

    public get email(): string {
        return this._email;
    }

    public get password(): string {
        return this._password;
    }

    public set nom(value: string) {
        this._nom = value;
    }

    public set prenom(value: string) {
        this._prenom = value;
    }

    public set email(value: string) {
        this._email = value;
    }

    public set password(value: string) {
        this._password = value;
    }

    public toJSON(): any {
        return {
            id: this._id,
            nom: this._nom,
            prenom: this._prenom,
            email: this._email,
            password: this._password
        };
    }
}
