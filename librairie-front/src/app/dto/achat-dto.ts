import { ArticleDto} from "./article-dto";
import { ClientDto } from "./client-dto";
import { PanierDto } from "./panier-dto";

export class AchatDto {

    constructor(
        private _id: number,
        private _prix: number,
        private _dateAchat: String,
        private _quantiteAchat: number,
        private _articleId: number,
        private _clientId: number,
        public article?: ArticleDto,
        public client?: ClientDto,
    ) { }

    public get id(): number {
        return this._id;
    }

    public get prix(): number {
        return this._prix;
    }

    public get dateAchat(): String {
        return this._dateAchat;
    }

    public get quantiteAchat(): number {
        return this._quantiteAchat;
    }

    public get articleId(): number {
        return this._articleId;
    }

    public get clientId(): number {
        return this._clientId;
    }

    public set id(value: number) {
        this._id = value;
    }

    public set prix(value: number) {
        this._prix = value;
    }

    public set dateAchat(value: String) {
        this._dateAchat = value;
    }

    public set quantiteAchat(value: number) {
        this._quantiteAchat = value;
    }

    public set articleId(value: number) {
        this._articleId = value;
    }

    public set clientId(value: number) {
        this._clientId = value;
    }

    public get ArticleId(): number {
        return this.article?.id as number ?? 0;
    }

    public get ArticleLibelle() : string {
        return this.article?.libelle as string ?? '';
    }

    public get ArticlePrix(): number {
        return this.article?.prix as number ?? 0;
    }

    public get ArticleStock(): number {
        return this.article?.stock as number ?? 0;
    }

    public get ClientNom() : string {
        return this.client?.nom as string ?? '';
    }


    public toJson(): any {
        return {
            prix: this.prix,
            dateAchat: this.dateAchat,
            quantiteAchat: this.quantiteAchat,
            articleId: this.articleId,
            clientId: this.clientId
        };
    }
}
