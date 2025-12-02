import { ArticleDto } from './article-dto';
import { AuteurDto } from './auteur-dto';
import { GenreDto } from './genre-dto';

export class LivreDto extends ArticleDto {
    constructor(
        id: number,
        stock: number,
        libelle: string,
        prix: number,
        private _annee: number,
        private _auteur: AuteurDto,
        private _genre : GenreDto
    ) {
        super(id, stock, libelle, prix);
    }

    public get annee(): number {
        return this._annee;
    }

    public get auteurId(): number {
        return this._auteur.id;
    }

    public get auteurNom(): String {
        return this._auteur.nom;
    }

    public get auteurPrenom(): String {
        return this._auteur.prenom;
    }

    public get genreId(): number {
        return this._genre.id;
    }

    public get genrelibelle(): String {
        return this._genre.libelle;
    }

    public set annee(value: number) {
        this._annee = value;
    }

    public set auteurId(value: number) {
        this._auteur.id = value;
    }

    public set auteurNom(value: String) {
        this._auteur.nom = value;
    }

    public set auteurPrenom(value: String) {
        this._auteur.prenom = value;
    }

    public set genreId(value: number) {
        this._genre.id = value;
    }

    public set genrelibelle(value: String) {
        this._genre.libelle = value;
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
