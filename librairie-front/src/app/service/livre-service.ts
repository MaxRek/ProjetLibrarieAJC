import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { LivreDto } from '../dto/livre-dto';

@Injectable({
  providedIn: 'root',
})
export class LivreService {
  private apiUrl = '/livre';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<LivreDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<LivreDto[]>(this.apiUrl)
      })
    );
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<LivreDto> {
    return this.http.get<LivreDto>(`${this.apiUrl}/${id}`);
  }

  public save(livreDto: LivreDto): Observable<void> {
    const payload = livreDto.toJson();

    if (!livreDto.id) {
      return this.http.post<void>(this.apiUrl, payload);
    }
    return this.http.put<void>(`${this.apiUrl}/${livreDto.id}`, payload);
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }
}
