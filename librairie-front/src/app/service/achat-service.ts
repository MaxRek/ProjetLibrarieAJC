import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { AchatDto } from '../dto/achat-dto';


@Injectable({
  providedIn: 'root',
})
export class AchatService {
  private apiUrl = '/achat';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<AchatDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<AchatDto[]>(this.apiUrl)
      })
    )
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<AchatDto> {
    return this.http.get<AchatDto>(`${this.apiUrl}/${id}`);
  }

  public findByClient(idClient: number): Observable<AchatDto[]> {
    return this.http.get<AchatDto[]>(`${this.apiUrl}/client/${idClient}`);
  }
  
  public save(achatDto: AchatDto): void {
    const payload = achatDto.toJson();

    if (!achatDto.id) {
      this.http.post<AchatDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return;
    }

    this.http.put<AchatDto>(`${this.apiUrl}/${achatDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }

}
