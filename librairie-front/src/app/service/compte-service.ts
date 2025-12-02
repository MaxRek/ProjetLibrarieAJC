import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { CompteDto } from '../dto/compte-dto';

@Injectable({
  providedIn: 'root',
})
export class CompteService {
  private apiUrl = '/compte';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  public findAll(): Observable<CompteDto[]> {
    return this.refresh$.pipe(
      startWith(void 0),
      switchMap(() => {
        return this.http.get<CompteDto[]>(this.apiUrl);
      })
    );
  }

  public refresh(): void {
    this.refresh$.next();
  }

  public findById(id: number): Observable<CompteDto> {
    return this.http.get<CompteDto>(`${this.apiUrl}/${id}`);
  }

  public save(compteDto: CompteDto): void {
    const payload = compteDto.toJSON();

    if(!compteDto.id) {
      this.http.post<CompteDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return;
    }
    this.http.put<CompteDto>(`${this.apiUrl}/${compteDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }
  
}
