import { GenreEnum } from '../enumerator/genre-enum';
import { ArticleDto } from './article-dto';
import { AuteurDto } from './auteur-dto';

export class LivreDto extends ArticleDto {
    constructor(
        id: number,
        stock: number,
        libelle: string,
        prix: number,
        private _annee: number,
        private _auteurId: number,
        private _genre?: GenreEnum,
        public auteur?: AuteurDto,
    ) {
        super(id, stock, libelle, prix);
    }

    public get annee(): number {
        return this._annee;
    }

    public get auteurId(): number {
        return this._auteurId;
    }

    public set annee(value: number) {
        this._annee = value;
    }

    public set auteurId(value: number) {
        this._auteurId = value;
    }

    public get genre(): GenreEnum {
        return this._genre as GenreEnum ?? '';
    }

    public set genre(value: GenreEnum) {
        this._genre = value;
    }
    
    public get auteurNom(): string {
        return this.auteur?.nom as string ?? '';
    }
    public get auteurPrenom(): string {
        return this.auteur?.prenom as string ?? '';
    }



    public override toJson(): any {
        return {
            ...super.toJson(),
            annee: this.annee,
            auteurId: this.auteurId,
            genre: this.genre,
        };
    }
}
