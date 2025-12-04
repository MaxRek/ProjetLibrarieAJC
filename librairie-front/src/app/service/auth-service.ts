import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequestDto } from '../dto/auth-request-dto';
import { AuthResponseDto } from '../dto/auth-response-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private _token: string = "";
    private _role: string = "";
    private _idClient: string = "";
  
    constructor(private http: HttpClient) {
      // On récupère le token de la sessionStorage, si ce token n'existe pas, on met un token vide
      this._token = sessionStorage.getItem("token") ?? "";
      this._idClient = sessionStorage.getItem("idClient") ?? "";
      this._role = sessionStorage.getItem("role") ?? "";
    }
  
    public get token(): string {
      return this._token;
    }

    public get role() : string {
      return this._role; 
    }

    public get idClient() : string {
      return this._idClient;
    }
    
  
    public auth(authRequest: AuthRequestDto): Promise<void> {
      return new Promise((resolve, reject) => {
        this.http.post<AuthResponseDto>('/compte/connexion', authRequest.toJson()).subscribe({
          // next => si la réponse est OK
          next: resp => {
            this._token = resp.token;
            this._idClient = resp.idClient;
            this._role = resp.role;

  
            // Stocker le jeton dans le navigateur, dans le sessionStorage, avec la clé "token"
            sessionStorage.setItem("token", this._token);
            sessionStorage.setItem("idClient", this._idClient);
            sessionStorage.setItem("role", this._role);
  
            // Quand le resolve va s'exécuter ... côté appelant, on pourra savoir quand c'est terminé
            resolve();
          },
  
          // error => si la réponse est KO (30X, 40X, 50X)
          error: err => reject(err)
        });
      })
    }

    public unAuth():void {
      sessionStorage.setItem("token", "");
      sessionStorage.setItem("idClient", "");
      sessionStorage.setItem("role", "");
    }
  }