export class AuthResponseDto {
    constructor(private _token: string, private _role: string, private _idClient : string) { }

    public get token(): string {
        return this._token;
    }

    public set token(value: string) {
        this._token = value;
    }
    
    public get role() : string {
        return this._role;
    }

    public set role(role : string) {
        this._role = role;
    }
    
    public get idClient() : string {
        return this._idClient;
    }
    
    public set idClient(v : string) {
        this._idClient = v;
    }
}