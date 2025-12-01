export class AuteurDto {
    constructor(private _id: number, private _nom: String, private _prenom: String) { }

    public get id(): number {
        return this._id;
    }

    public get nom(): String {
        return this._nom;
    }

    public get prenom(): String {
        return this._prenom;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set nom(value: String) {
        this._nom = value;
    }

    public set prenom(value: String) {
        this._prenom = value;
    }

    public toJson(): any {
        return {
            id: this.id,
            nom: this.nom,
            prenom: this.prenom
        };
    }
}
