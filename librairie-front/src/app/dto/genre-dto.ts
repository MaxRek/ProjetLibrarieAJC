export class GenreDto {
    constructor(private _id: number, private _libelle: String) { }

    public get id(): number {
        return this._id;
    }

    public get libelle(): String {
        return this._libelle;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set libelle(value: String) {
        this._libelle = value;
    }

    public toJson(): any { 
        return {
            id: this.id,
            libelle: this.libelle
        };
    }
}
