import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AuteurDto } from '../dto/auteur-dto';


@Injectable({
  providedIn: 'root',
})
export class AuteurService {
  private apiUrl = 'http://localhost:8080/api/auteur';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<AuteurDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<AuteurDto[]>(this.apiUrl)
      })
    )
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<AuteurDto> {
    return this.http.get<AuteurDto>(`${this.apiUrl}/${id}`);
  }

  public save(auteurDto: AuteurDto): void {
    const payload = auteurDto.toJson();

    if (!auteurDto.id) {
      this.http.post<AuteurDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return;
    }

    this.http.put<AuteurDto>(`${this.apiUrl}/${auteurDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }

}
