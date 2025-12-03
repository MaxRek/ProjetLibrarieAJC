import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { PanierDto } from '../dto/panier-dto';


@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private apiUrl = 'http://localhost:8080/api/panier';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<PanierDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<PanierDto[]>(this.apiUrl)
      })
    )
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<PanierDto> {
    return this.http.get<PanierDto>(`${this.apiUrl}/${id}`);
  }

  public findByClient(idClient: number): Observable<PanierDto[]> {
    return this.http.get<PanierDto[]>(`${this.apiUrl}/client/${idClient}`);
  }

  public save(panierDto: PanierDto): void {
    const payload = panierDto.toJson();

    if (!panierDto.id) {
      this.http.post<PanierDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return;
    }

    this.http.put<PanierDto>(`${this.apiUrl}/${panierDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }

}
