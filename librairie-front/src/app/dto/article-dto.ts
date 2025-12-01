export class ArticleDto {
    constructor(
        private _id : number,
        private _stock: number,
        private _libelle: string,
        private _prix: number
    ) { }

    public get id(): number {
        return this._id;
    }

    public get stock(): number {
        return this._stock;
    }

    public get libelle(): string {
        return this._libelle;
    }

    public get prix(): number {
        return this._prix;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set stock(value: number) {
        this._stock = value;
    }

    public set libelle(value: string) {
        this._libelle = value;
    }

    public set prix(value: number) {
        this._prix = value;
    }

    public toJson(): any {
        return {
            id: this.id,
            Stock: this.stock,
            libelle: this.libelle,
            prix: this.prix
        };
    }
}
