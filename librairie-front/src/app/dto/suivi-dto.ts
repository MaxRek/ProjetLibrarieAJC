import { ArticleDto} from "./article-dto";
import { ClientDto } from "./client-dto";

export class SuiviDto {
    constructor(
        private _id: number,
        private _articleId: number,
        private _clientId: number,
        public article?: ArticleDto,
        public client?: ClientDto,
    ) { }

    public get id(): number {
        return this._id;
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

    public set articleId(value: number) {
        this._articleId = value;
    }

    public set clientId(value: number) {
        this._clientId = value;
    }

    public get ArticleLibelle() : string {
        return this.article?.libelle as string ?? '';
    }

    public get ClientNom() : string {
        return this.client?.nom as string ?? '';
    }

    public toJson(): any {
        return {
            articleId: this.articleId,
            clientId: this.clientId
        };
    }
}
