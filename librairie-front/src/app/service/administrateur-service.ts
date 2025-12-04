import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AdministrateurDto } from '../dto/administrateur-dto';

@Injectable({
  providedIn: 'root',
})
export class AdministrateurService {
  private apiUrl = 'http://localhost:8080/api/admin';
  private refresh$: Subject<void> = new Subject<void>();
  constructor(private http: HttpClient) {}

  public findAll(): Observable<AdministrateurDto[]> {
    return this.refresh$.pipe(
      startWith(void 0),
      switchMap(() => {
        return this.http.get<AdministrateurDto[]>(this.apiUrl);
      })
    );

  }

  public refresh(): void {
    this.refresh$.next();
  }

  public findById(id: number): Observable<AdministrateurDto> {
    return this.http.get<AdministrateurDto>(`${this.apiUrl}/${id}`);
  }

  public save(administrateurDto: AdministrateurDto): void {
    const payload = administrateurDto.toJSON();
    if(!administrateurDto.id) {
      this.http.post<AdministrateurDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return;
    }
    this.http.put<AdministrateurDto>(`${this.apiUrl}/${administrateurDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }
  
}
