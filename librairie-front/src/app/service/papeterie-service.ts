import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { PapeterieDto } from '../dto/papeterie-dto';

@Injectable({
  providedIn: 'root',
})
export class PapeterieService {
  private apiUrl = 'http://localhost:8080/api/papeterie';
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

  public save(papeterieDto: PapeterieDto): void {
    const payload = papeterieDto.toJson();

    if (!papeterieDto.id) {
      this.http.post<PapeterieDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return ;
    }

    this.http.put<PapeterieDto>(`${this.apiUrl}/${papeterieDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }
}
