import { ArticleDto} from "./article-dto";
import { ClientDto } from "./client-dto";

export class ReviewDto {
    constructor(
        private _id: number, 
        private _review: String,
        private _note: number,
        private _dateReview: String,
        private _articleId: number,
        private _clientId: number,
        public article?: ArticleDto,
        public client?: ClientDto,
        ) { }

    public get id(): number {
        return this._id;
    }

    public get review(): String {
        return this._review;
    }

    public get note(): number {
        return this._note;
    }

    public get dateReview(): String {
        return this._dateReview;
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

    public set review(value: String) {
        this._review = value;
    }

    public set note(value: number) {
        this._note = value;
    }

    public set dateReview(value: String) {
        this._dateReview = value;
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
            review: this.review,
            note: this.note,
            dateReview: this.dateReview,
            articleId: this.articleId,
            clientId: this.clientId
        };
    }
}
