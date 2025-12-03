import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ReviewDto } from '../dto/review-dto';


@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = '/review';
  private refresh$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) { }

  public findAll(): Observable<ReviewDto[]> {
    return this.refresh$.pipe(
      startWith(null),
      switchMap(() => {
        return this.http.get<ReviewDto[]>(this.apiUrl)
      })
    )
  }

  public refresh() {
    this.refresh$.next();
  }

  public findById(id: number): Observable<ReviewDto> {
    return this.http.get<ReviewDto>(`${this.apiUrl}/${id}`);
  }

  public save(reviewDto: ReviewDto): void {
    const payload = reviewDto.toJson();

    if (!reviewDto.id) {
      this.http.post<ReviewDto>(this.apiUrl, payload).subscribe(() => this.refresh());
      return;
    }

    this.http.put<ReviewDto>(`${this.apiUrl}/${reviewDto.id}`, payload).subscribe(() => this.refresh());
  }

  public deleteById(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).subscribe(() => this.refresh());
  }

}
