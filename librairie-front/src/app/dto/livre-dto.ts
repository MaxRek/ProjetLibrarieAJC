import { ArticleDto } from './article-dto';

export class LivreDto extends ArticleDto {
    constructor(
        id: number,
        stock: number,
        libelle: string,
        prix: number,
        private _annee: number,
        private _auteurId: number,
        private _genreId: number
    ) {
        super(id, stock, libelle, prix);
    }

    public get annee(): number {
        return this._annee;
    }

    public get auteurId(): number {
        return this._auteurId;
    }

    public get genreId(): number {
        return this._genreId;
    }

    public set annee(value: number) {
        this._annee = value;
    }

    public set auteurId(value: number) {
        this._auteurId = value;
    }

    public set genreId(value: number) {
        this._genreId = value;
    }

    public override toJson(): any {
        return {
            ...super.toJson(),
            annee: this.annee,
            auteurId: this.auteurId,
            genreId: this.genreId
        };
    }
}
