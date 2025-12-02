import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ClientDto } from '../dto/client-dto';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = '/client';
  private refresh$: Subject<void> = new Subject<void>();
  constructor(private http: HttpClient) {}

  public findAll(): Observable<ClientDto[]> {
    return this.refresh$.pipe(
      startWith(void 0),
      switchMap(() => {
        return this.http.get<ClientDto[]>(this.apiUrl);
      })
    );
  }

  public refresh(): void {
    this.refresh$.next();
  }

  public findById(id: number): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.apiUrl}/${id}`);
  }

  public save(clientDto: ClientDto): void {
    const payload = clientDto.toJSON();
    if(!clientDto.id) {
      this.http.post<ClientDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return;
    }
    this.http.put<ClientDto>(`${this.apiUrl}/${clientDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }
    
}
