import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ArticleDto } from '../dto/article-dto';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl = '/article';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<ArticleDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<ArticleDto[]>(this.apiUrl);
      })
    );
  }

  public refresh(): void {
    this.refresh$.next();
  }

  public findById(id: number): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiUrl}/${id}`);
  }

  public save(articleDto: ArticleDto): void {
    const payload = articleDto.toJson();

    if (!articleDto.id) {
      this.http.post<ArticleDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return;
    }
    this.http.put<ArticleDto>(`${this.apiUrl}/${articleDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }
  
}
