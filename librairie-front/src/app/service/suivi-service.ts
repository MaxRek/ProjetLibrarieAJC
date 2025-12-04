import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { SuiviDto } from '../dto/suivi-dto';


@Injectable({
  providedIn: 'root',
})
export class SuiviService {
  private apiUrl = '/suivi';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<SuiviDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<SuiviDto[]>(this.apiUrl)
      })
    )
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<SuiviDto> {
    return this.http.get<SuiviDto>(`${this.apiUrl}/${id}`);
  }

  public findByClient(idClient: number): Observable<SuiviDto[]> {
    return this.http.get<SuiviDto[]>(`${this.apiUrl}/client/${idClient}`);
  }

  public save(suiviDto: SuiviDto): void {
    const payload = suiviDto.toJson();

    if (!suiviDto.id) {
      this.http.post<SuiviDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return;
    }

    this.http.put<SuiviDto>(`${this.apiUrl}/${suiviDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }

}
