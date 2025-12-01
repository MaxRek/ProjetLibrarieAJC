import { ArticleDto } from './article-dto';

export class PapeterieDto extends ArticleDto {
    constructor(
        id: number,
        stock: number,
        libelle: string,
        prix: number,
        private _type: string,
        private _marque: string
    ) {
        super(id, stock, libelle, prix);
    }

    public get type(): string {
        return this._type;
    }

    public get marque(): string {
        return this._marque;
    }

    public set type(value: string) {
        this._type = value;
    }

    public set marque(value: string) {
        this._marque = value;
    }

    public override toJson(): any {
        return {
            ...super.toJson(),
            type: this.type,
            marque: this.marque
        };
    }
}
