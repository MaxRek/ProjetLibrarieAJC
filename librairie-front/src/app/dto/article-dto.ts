export class ArticleDto {
    constructor(
        private _id : number,
        private _quantiteStock: number,
        private _libelle: string,
        private _prix: number
    ) { }

    public get id(): number {
        return this._id;
    }

    public get quantiteStock(): number {
        return this._quantiteStock;
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

    public set quantiteStock(value: number) {
        this._quantiteStock = value;
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
            quantiteStock: this.quantiteStock,
            libelle: this.libelle,
            prix: this.prix
        };
    }
}
