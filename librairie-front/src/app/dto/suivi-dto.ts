export class SuiviDto {
    constructor(
        private _id: number,
        private _articleId: number,
        private _clientId: number
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

    public toJson(): any {
        return {
            id: this.id,
            articleId: this.articleId,
            clientId: this.clientId
        };
    }
}
