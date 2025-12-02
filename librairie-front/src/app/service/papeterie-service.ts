import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { PapeterieDto } from '../dto/papeterie-dto';

@Injectable({
  providedIn: 'root',
})
export class PapeterieService {
  private apiUrl = '/papeterie';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<PapeterieDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => { 
        return this.http.get<PapeterieDto[]>(this.apiUrl)
      })
    );
  }

  public refresh(): void {
    this.refresh$.next();
  }

  public findById(id: number): Observable<PapeterieDto> {
    return this.http.get<PapeterieDto>(`${this.apiUrl}/${id}`);
  }

  public save(papeterieDto: PapeterieDto): Observable<PapeterieDto> {
    const payload = papeterieDto.toJson();

    if (!papeterieDto.id) {
      return this.http.post<PapeterieDto>(this.apiUrl, payload);
    }

    return this.http.put<PapeterieDto>(`${this.apiUrl}/${papeterieDto.id}`, payload);
  }

  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
